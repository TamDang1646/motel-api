import { Client } from "onesignal-node";
import {
  AddDeviceBody,
  ClientResponse,
  CreateNotificationBody,
} from "onesignal-node/lib/types";
import RedisComponent from "src/components/redis.component";
import { ErrorCodes } from "src/constants/error-code.const";
import {
  Env,
  Platform,
} from "src/enums/app.enum";
import {
  PushNotificationError,
} from "src/exceptions/errors/push-notification.error";
import { LoggerService } from "src/logger/custom.logger";
import { isEnv } from "src/utils/general.util";

import { Injectable } from "@nestjs/common";

import { CallDataDto } from "./dto/call-data.dto";
import {
  ContentsDto,
  NotifcationDto,
} from "./dto/notification.dto";

@Injectable()
export class NotificationService {
    //FIXME: move to configuration
    private readonly voipClient: Client = new Client(
        "2e5dbb2c-babe-4fb1-a799-44ab54611446",//app id
        "Njg4MjE5OTYtZmVkYy00MzFkLWIyOTEtMGUwZGI4ZDdiMDU5");//app key
    private readonly client: Client = new Client(
        "66a426b2-5524-4c88-b2bb-038a0c8b4173",//app id
        "ZGE3NjA3MjUtNzEzNy00M2VmLTkyOTItMDhmYjUzZDI2ZTM1");//app key
    constructor(
        private readonly redisComponent: RedisComponent,
        private readonly loggerService: LoggerService,
    ) {
    }
    registerVoIPDeviceToken = async (userId: number, token: string) => {
        const addDeviceBody: AddDeviceBody = { device_type: 0 };//ios    
        addDeviceBody.identifier = token;
        //remove in prod mode
        if (isEnv(Env.Dev)) {
            console.log("Dev mode ", token)
            addDeviceBody.test_type = 1;
        }
        // console.log("registerVoIPDeviceToken", userId, token);
        addDeviceBody.external_user_id = "" + userId;
        const clientResponse = await this.voipClient.addDevice(addDeviceBody);
        return clientResponse.body;
    }

    unregisterVoIPDeviceToken = async (uid: string) => {
        const clientResponse = await this.voipClient.deleteDevice(uid)
        return clientResponse.body;
    }
    sendVoIPPush = async (userId: number, callData: CallDataDto) => {
        const notiBody: CreateNotificationBody = {};
        notiBody.content_available = true;
        notiBody.apns_push_type_override = "voip";
        notiBody.priority = 10;
        notiBody.include_external_user_ids = ["" + userId];
        notiBody.data = callData;
        const clientResponse = await this.voipClient.createNotification(notiBody);
        return clientResponse.body;
    }

    sendDataPush = async (userId: number, data: CallDataDto, platform: Platform = Platform.Android) => {
        const notiBody: CreateNotificationBody = {};
        notiBody.content_available = true;
        notiBody.priority = 10;
        notiBody.include_external_user_ids = ["" + userId];
        if (data) {
            notiBody.data = {
                "uuid": data.uuid
                , "calleeId": data.calleeId
                , "callerAvatar": data.callerAvatar
                , "callerId": data.callerId
                , "callerName": data.callerName
                , "channelName": data.channelName
                , "handle": data.handle
            };
        }
        notiBody.contents = { "en": "Call update", "vi": "Cập nhật cuộc gọi" }
        notiBody.isIos = platform == Platform.Ios;
        notiBody.isAndroid = platform == Platform.Android;
        notiBody.isAnyWeb = platform == Platform.Web;
        notiBody.channel_for_external_user_ids = "push";
        // notiBody.include_player_ids = ["ae3a7f45-6198-4993-b734-6874eaea5758"];

        const clientResponse = await this.client.createNotification(notiBody);
        // console.log("notiBody", notiBody, clientResponse.body);
        return clientResponse.body;
    }

    async sendToUserGroup(content: ContentsDto, userIds: Array<number>) {
        const notiBody: CreateNotificationBody = {};
        notiBody.include_external_user_ids = userIds.map(id => "" + id);

        notiBody.contents = { "en": content.en, "vi": content.vi }
        notiBody.channel_for_external_user_ids = "push";

        const clientResponse = await this.client.createNotification(notiBody);
        return clientResponse.body;

    }
    async publishNotification(
        platform: Platform,
        notificationData: NotifcationDto
    ): Promise<ClientResponse> {
        //Segments and PlayerIds cannot work in tandem
        if (notificationData.includedPlayerIds && notificationData.includedSegments) {
            throw new PushNotificationError(
                "SEGMENTS_AND_IDS_PRESENT",
                "Both includedSegments and includedPlayerIds are present",
                ErrorCodes.SEGMENTS_AND_IDS_PRESENT
            )
        }

        //Prepare notification body
        const notificationBody: CreateNotificationBody = {}

        //Check and setup platform
        switch (platform) {
            case Platform.Any:
                break;
            case Platform.Android:
                notificationBody.isAndroid = true
                break

            case Platform.Ios:
                notificationBody.isIos = true
                break

            case Platform.Web:
                notificationBody.isAnyWeb = true
                break

            default:
                throw new PushNotificationError(
                    "UNSUPPORTED_PLATFORM",
                    "Unsupported platform",
                    ErrorCodes.UNSUPPORTED_PLATFORM
                )
        }

        //Set notification content
        // notificationBody.contents = notificationData.contents
        notificationBody.contents = { "en": notificationData.contents.en, "vi": notificationData.contents.vi }

        if (notificationData.includedExternaluserIds) {
            notificationBody.include_external_user_ids = notificationData.includedExternaluserIds;
        }
        //Publish notification to segments or players
        else if (notificationData.includedPlayerIds && !notificationData.includedSegments) {
            notificationBody.include_player_ids = notificationData.includedPlayerIds

        } else {
            const segments = notificationData.includedSegments ?? ["Subscribed Users"]
            notificationBody.included_segments = segments
        }

        if (notificationData.contents.data) {
            notificationBody.data = notificationData.contents.data;
        }
        //Publish Notification
        const respond = await this.client.createNotification(notificationBody)
            .catch((error: Error) => {
                this.loggerService.error(error.message, error.stack, error.name);
                return null;
                // throw new PushNotificationError(
                //     "PUSH_NOTIFICATION_ERROR",
                //     error,
                //     ErrorCodes.PUSH_NOTIFICATION_ERROR
                // )
            })

        //Additional Error    
        // if ("errors" in respond.body) {
        //     throw new PushNotificationError(
        //         "PUSH_NOTIFICATION_ERROR",
        //         respond.body,
        //         ErrorCodes.PUSH_NOTIFICATION_ERROR
        //     )
        // }

        return respond
    }

    // /**
    //  * 
    //  * @param platform 
    //  * @param content 
    //  * @param data 
    //  * @param userIds 
    //  * @param jobId 
    //  * @param sendTime 
    //  * @returns 
    //  */
    // async scheduleNotification(
    //     platform: Platform,
    //     content: string,
    //     data: any = null,
    //     userIds: string[] | null = null,
    //     jobId: number | null = null,
    //     sendTime: number = 0,//Unix time
    // ): Promise<PNQueue> {
    //     const obj = new PNQueue();
    //     obj.content = content;
    //     obj.timeToSend = sendTime;
    //     if (jobId) obj.jobId = jobId;
    //     obj.platform = platform;
    //     if (userIds && userIds.length > 0) obj.userIds = userIds.join(",");
    //     if (data) obj.extraContent = JSON.stringify(data)
    //     return await this.pNQueueService.save(obj);
    // }

    /**
     * run every 2 minutes from 6am t0 10pm
     * @returns 
     */
    // @Cron('0 */2 6-22 * * *')
    // async sendScheduledPN() {
    //     const isRunning = await this.redisComponent.getJson("sendScheduledPN_running");
    //     if (isRunning) {
    //         console.log("sendScheduledPN has already running");
    //         return;
    //     }
    //     await this.redisComponent.setJson("sendScheduledPN_running", 1);

    //     console.log("sendScheduledPN");
    //     const queue = await this.getPNQueue();
    //     if (queue && queue.length > 0) {
    //         queue.forEach((queue) => {
    //             this.processQueue(queue);
    //         })
    //     }
    //     await this.redisComponent.setJson("sendScheduledPN_running", 0);
    // }

    // async getPNQueue() {
    //     const now = Math.floor(new Date().getTime() / 1000);
    //     return await this.pNQueueService.findTasks(now);
    // }

    /**
     * 
     * @param queue 
     */
    // async processQueue(queue: PNQueue) {

    //     const data = new NotifcationDto();
    //     data.contents = new ContentsDto();
    //     data.contents.vi = queue.content;
    //     data.contents.en = queue.content;
    //     if (queue.extraContent) {
    //         data.contents.data = JSON.parse(queue.extraContent);
    //     }
    //     if (queue.userIds) {
    //         data.includedExternaluserIds = queue.userIds.split(",");
    //     }
    //     else {
    //         //send PN for jobId
    //         if (queue.jobId) {
    //             const relatedPeople = await this.jobService.findRelatedPeople(queue.jobId);
    //             console.log("relatedPeople ", relatedPeople);
    //             if (relatedPeople) {
    //                 const uids = relatedPeople.map(obj => "" + obj.userId);
    //                 console.log("uids ", uids);
    //                 data.includedExternaluserIds = uids;
    //             }
    //         }
    //     }
    //     this.publishNotification(queue.platform, data);
    //     queue.status = 1;
    //     this.pNQueueService.update(queue.id, queue);
    // }
}
