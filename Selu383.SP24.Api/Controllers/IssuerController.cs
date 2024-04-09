using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Crypto.Signers;
using PeterO.Cbor;
using System.Runtime.InteropServices.Marshalling;

namespace Selu383.SP24.Api.Controllers;

[Route("api")]
[ApiController]
public class IssuerController : ControllerBase
{
    private readonly Ed25519PrivateKeyParameters serverPrivateKey;

    public IssuerController(IConfiguration configuration)
    {
        var hex = configuration.GetValue<string>("ServerPrivateKey") ?? throw new Exception("missing key");
        serverPrivateKey = new Ed25519PrivateKeyParameters(HexUtil.HexToBytes(hex));
    }

    [HttpPost("issue-sco")]
    public ActionResult<string> IssueSco(RequestScoDto request)
    {
        var deviceKey = HexUtil.HexToBytes(request.DeviceKeyHex);
        var payload = CBORObject.NewMap()
            .Add("p", CBORObject.FromObjectAndTag(deviceKey, 64))
            .Add("s", request.Start.ToUnixTimeMilliseconds())
            .Add("e", request.End.ToUnixTimeMilliseconds())
            .Add("i", request.Identity)
            .Add("l", request.Lock)
            .EncodeToBytes();

        var signer = new Ed25519Signer();
        signer.Init(true, serverPrivateKey);
        signer.BlockUpdate(payload, 0, payload.Length);

        var signature = signer.GenerateSignature();
        var sco = CBORObject.NewArray()
            .Add(CBORObject.FromObjectAndTag(payload, 64))
            .Add(CBORObject.FromObjectAndTag(signature, 64))
            .EncodeToBytes();

        return Ok(HexUtil.BytesToHex(sco));
    }
}

public class RequestScoDto
{
    public string DeviceKeyHex { get; set; }
    public string Lock { get; set; }
    public string Identity { get; set; }
    public DateTimeOffset Start { get; set; }
    public DateTimeOffset End { get; set; }
}

public static class HexUtil
{
    public static byte[] HexToBytes(string hex)
    {
        // see: https://stackoverflow.com/a/9995303
        byte[] arr = new byte[hex.Length >> 1];

        for (int i = 0; i < hex.Length >> 1; ++i)
        {
            arr[i] = (byte)((GetHexVal(hex[i << 1]) << 4) + (GetHexVal(hex[(i << 1) + 1])));
        }

        return arr;

        static int GetHexVal(char hex)
        {
            int val = (int)hex;
            //For uppercase A-F letters:
            //return val - (val < 58 ? 48 : 55);
            //For lowercase a-f letters:
            //return val - (val < 58 ? 48 : 87);
            //Or the two combined, but a bit slower:
            return val - (val < 58 ? 48 : (val < 97 ? 55 : 87));
        }
    }

    public static string BytesToHex(byte[] bytes)
    {
        return BitConverter.ToString(bytes).Replace("-", string.Empty).ToLower();
    }
}