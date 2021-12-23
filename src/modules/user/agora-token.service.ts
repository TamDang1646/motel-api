import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-access-token')

@Injectable()
export class AgoraTokenService {

    constructor(
        private readonly configService: ConfigService,
    ) {
        console.log("AgoraTokenService initializing...")
    }



    createAgoraToken = async (uid: number, channelName: string, role = RtcRole.PUBLISHER, expirationTimeInSeconds: number = 3600) => {
        // Rtc Examples
        const appID = this.configService.get<string>("AGORA_APP_ID") || "737031a319aa4f589523c5ba4de8642f";
        const appCertificate = this.configService.get<string>("AGORA_APP_CERT") || "e72219d813d94d418b783642483cc632";;

        const currentTimestamp: number = Math.floor(Date.now() / 1000)

        const privilegeExpiredTs: number = currentTimestamp + expirationTimeInSeconds

        // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

        // console.log("createAgoraToken", channelName, uid, role, typeof (expirationTimeInSeconds), typeof (privilegeExpiredTs), typeof (currentTimestamp));
        // Build token with uid
        // const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
        // console.log("Token With Integer Number Uid: " + tokenA);

        // Build token with user account
        const tokenB = RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, "" + uid, role, privilegeExpiredTs);
        // console.log("Token With UserAccount: " + tokenB);
        return tokenB;
        // return tokenA;
    }
}