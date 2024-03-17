import { ed25519 } from "@noble/curves/ed25519"
import { bytesToHex } from "@nocle/curves/abstract/utils"
import { useEffect } from "react";


const privateDeviceKey = ed25519.utils.randomPrivateKey();
const publicDeviceKey = ed25519.getPublicKey(privateDeviceKey);

console.log(bytesToHex(publicDeviceKey)); //print hex string

export default function CheckIn() {
    const [signedBytes, setSignedBytes] = useState(null);

    useEffect(() => {
        const now = new Date();
        const start = new Date(now.valueOf() - 1000 * 60 * 60)
        const end = new Date(now.valueOf() + 1000 * 60 * 60 * 24 * 2000);

        const devicePrivateKey = ed25519.utils.randomPrivateKey();
        const devicePublicKey = ed25519.getPublicKey(devicePrivateKey);

        const requestSco = {
            deviceKeyHex: bytesToHex(devicePublicKey),

            //Lock end user, access to all locks
            lock: "*",

            identity:"Jon",

            start: start.toISOString(),

            end: end.toISOString(),
        };
        
    });
}