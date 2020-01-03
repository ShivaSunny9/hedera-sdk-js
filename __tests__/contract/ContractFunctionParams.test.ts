import { ContractFunctionParams } from "../../src/exports";
import BigNumber from "bignumber.js";

describe("ContractFunctionParams", () => {
    const int32 = 16909060;

    const bytes = new Uint8Array(10);
    bytes[ 1 ] = 1;
    bytes[ 4 ] = 4;
    bytes[ 9 ] = 8;

    const int64 = new BigNumber("ffffffff", 16).multipliedBy(new BigNumber(256).pow(4));

    const str = "this is a grin: \uD83D\uDE01";

    const strArray: string[] = [ "one", "two" ];

    it("encodes correctly using function selector", () => {
        const bytes2 = new Uint8Array(32);
        bytes2[ 0 ] = 255;
        bytes2[ 31 ] = 255;

        const params = new ContractFunctionParams()
            .addInt32(int32)
            .addBytes(bytes)
            .addInt64(int64)
            .addBytes(bytes2)
            .addString(str);

        const finished = params._build("f");
        const funcHash = Buffer.from(finished.slice(0, 4).buffer).toString("hex");
        const firstParam = Buffer.from(finished.slice((32 * 0) + 4, (32 * 1) + 4).buffer).toString("hex");
        const secondParam = Buffer.from(finished.slice((32 * 1) + 4, (32 * 2) + 4).buffer).toString("hex");
        const thirdParam = Buffer.from(finished.slice((32 * 2) + 4, (32 * 3) + 4).buffer).toString("hex");
        const forthParam = Buffer.from(finished.slice((32 * 3) + 4, (32 * 4) + 4).buffer).toString("hex");
        const fifthParam = Buffer.from(finished.slice((32 * 4) + 4, (32 * 5) + 4).buffer).toString("hex");
        const secondParamDataLength = Buffer.from(finished.slice((32 * 5) + 4, (32 * 6) + 4).buffer).toString("hex");
        const secondParamData = Buffer.from(finished.slice((32 * 6) + 4, (32 * 7) + 4).buffer).toString("hex");
        const fourthParamDataLength = Buffer.from(finished.slice((32 * 7) + 4, (32 * 8) + 4).buffer).toString("hex");
        const fourthParamData = Buffer.from(finished.slice((32 * 8) + 4, (32 * 9) + 4).buffer).toString("hex");
        const fifthParamDataLength = Buffer.from(finished.slice((32 * 9) + 4, (32 * 10) + 4).buffer).toString("hex");
        const fifthParamData = Buffer.from(finished.slice((32 * 10) + 4, (32 * 11) + 4).buffer).toString("hex");
        expect(funcHash).toStrictEqual("b54f97cf");
        expect(firstParam).toStrictEqual("0000000000000000000000000000000000000000000000000000000001020304");
        expect(secondParam).toStrictEqual("00000000000000000000000000000000000000000000000000000000000000a0");
        expect(thirdParam).toStrictEqual("000000000000000000000000000000000000000000000000ffffffff00000000");
        expect(forthParam).toStrictEqual("00000000000000000000000000000000000000000000000000000000000000e0");
        expect(fifthParam).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000120");
        expect(secondParamDataLength).toStrictEqual("000000000000000000000000000000000000000000000000000000000000000a");
        expect(secondParamData).toStrictEqual("0001000004000000000800000000000000000000000000000000000000000000");
        expect(fourthParamDataLength).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000020");
        expect(fourthParamData).toStrictEqual("ff000000000000000000000000000000000000000000000000000000000000ff");
        expect(fifthParamDataLength).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000014");
        expect(fifthParamData).toStrictEqual("746869732069732061206772696e3a20f09f9881000000000000000000000000");
        expect(finished).toHaveLength(356);
    });

    it("encodes correctly using generic addParam", () => {
        const params = new ContractFunctionParams()
            .addInt32(int32)
            .addInt32(int32)
            .addInt64(int64)
            .addString(str)
            .addInt32(1515)
            .addStringArray(strArray);

        const finished = params._build("f");
        const funcHash = Buffer.from(finished.slice(0, 4).buffer).toString("hex");
        const firstParam = Buffer.from(finished.slice((32 * 0) + 4, (32 * 1) + 4).buffer).toString("hex");
        const secondParam = Buffer.from(finished.slice((32 * 1) + 4, (32 * 2) + 4).buffer).toString("hex");
        const thirdParam = Buffer.from(finished.slice((32 * 2) + 4, (32 * 3) + 4).buffer).toString("hex");
        const forthParam = Buffer.from(finished.slice((32 * 3) + 4, (32 * 4) + 4).buffer).toString("hex");
        const fifthParam = Buffer.from(finished.slice((32 * 4) + 4, (32 * 5) + 4).buffer).toString("hex");
        const sixthParam = Buffer.from(finished.slice((32 * 5) + 4, (32 * 6) + 4).buffer).toString("hex");
        const fourthParamDataLength = Buffer.from(finished.slice((32 * 6) + 4, (32 * 7) + 4).buffer).toString("hex");
        const fourthParamData = Buffer.from(finished.slice((32 * 7) + 4, (32 * 8) + 4).buffer).toString("hex");
        const sixthParamDataLength = Buffer.from(finished.slice((32 * 8) + 4, (32 * 9) + 4).buffer).toString("hex");
        const sixthParamFirstElOff = Buffer.from(finished.slice((32 * 9) + 4, (32 * 10) + 4).buffer).toString("hex");
        const sixthParamSecondElOff = Buffer.from(finished.slice((32 * 10) + 4, (32 * 11) + 4).buffer).toString("hex");
        const sixthParamFirstElLen = Buffer.from(finished.slice((32 * 11) + 4, (32 * 12) + 4).buffer).toString("hex");
        const sixthParamFirstEl = Buffer.from(finished.slice((32 * 12) + 4, (32 * 13) + 4).buffer).toString("hex");
        const sixthParamSecondElLen = Buffer.from(finished.slice((32 * 13) + 4, (32 * 14) + 4).buffer).toString("hex");
        const sixthParamSecondEl = Buffer.from(finished.slice((32 * 14) + 4, (32 * 15) + 4).buffer).toString("hex");
        expect(funcHash).toStrictEqual("a27fc6f6");
        expect(firstParam).toStrictEqual("0000000000000000000000000000000000000000000000000000000001020304");
        expect(secondParam).toStrictEqual("0000000000000000000000000000000000000000000000000000000001020304");
        expect(thirdParam).toStrictEqual("000000000000000000000000000000000000000000000000ffffffff00000000");
        expect(forthParam).toStrictEqual("00000000000000000000000000000000000000000000000000000000000000c0");
        expect(fifthParam).toStrictEqual("00000000000000000000000000000000000000000000000000000000000005eb");
        expect(sixthParam).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000100");
        expect(fourthParamDataLength).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000014");
        expect(fourthParamData).toStrictEqual("746869732069732061206772696e3a20f09f9881000000000000000000000000");
        expect(sixthParamDataLength).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000002");
        expect(sixthParamFirstElOff).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000040");
        expect(sixthParamSecondElOff).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000080");
        expect(sixthParamFirstElLen).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000003");
        expect(sixthParamFirstEl).toStrictEqual("6f6e650000000000000000000000000000000000000000000000000000000000");
        expect(sixthParamSecondElLen).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000003");
        expect(sixthParamSecondEl).toStrictEqual("74776f0000000000000000000000000000000000000000000000000000000000");
        expect(finished).toHaveLength(484);
    });

    it("encodes correctly without name", () => {
        const params = new ContractFunctionParams()
            .addInt32(int32)
            .addInt32(int32)
            .addInt64(int64)
            .addString(str)
            .addInt32(1515)
            .addStringArray(strArray);

        const finished = params._build(null);
        const firstParam = Buffer.from(finished.slice((32 * 0), (32 * 1)).buffer).toString("hex");
        const secondParam = Buffer.from(finished.slice((32 * 1), (32 * 2)).buffer).toString("hex");
        const thirdParam = Buffer.from(finished.slice((32 * 2), (32 * 3)).buffer).toString("hex");
        const forthParam = Buffer.from(finished.slice((32 * 3), (32 * 4)).buffer).toString("hex");
        const fifthParam = Buffer.from(finished.slice((32 * 4), (32 * 5)).buffer).toString("hex");
        const sixthParam = Buffer.from(finished.slice((32 * 5), (32 * 6)).buffer).toString("hex");
        const fourthParamDataLength = Buffer.from(finished.slice((32 * 6), (32 * 7)).buffer).toString("hex");
        const fourthParamData = Buffer.from(finished.slice((32 * 7), (32 * 8)).buffer).toString("hex");
        const sixthParamDataLength = Buffer.from(finished.slice((32 * 8), (32 * 9)).buffer).toString("hex");
        const sixthParamFirstElOff = Buffer.from(finished.slice((32 * 9), (32 * 10)).buffer).toString("hex");
        const sixthParamSecondElOff = Buffer.from(finished.slice((32 * 10), (32 * 11)).buffer).toString("hex");
        const sixthParamFirstElLen = Buffer.from(finished.slice((32 * 11), (32 * 12)).buffer).toString("hex");
        const sixthParamFirstEl = Buffer.from(finished.slice((32 * 12), (32 * 13)).buffer).toString("hex");
        const sixthParamSecondElLen = Buffer.from(finished.slice((32 * 13), (32 * 14)).buffer).toString("hex");
        const sixthParamSecondEl = Buffer.from(finished.slice((32 * 14), (32 * 15)).buffer).toString("hex");
        expect(firstParam).toStrictEqual("0000000000000000000000000000000000000000000000000000000001020304");
        expect(secondParam).toStrictEqual("0000000000000000000000000000000000000000000000000000000001020304");
        expect(thirdParam).toStrictEqual("000000000000000000000000000000000000000000000000ffffffff00000000");
        expect(forthParam).toStrictEqual("00000000000000000000000000000000000000000000000000000000000000c0");
        expect(fifthParam).toStrictEqual("00000000000000000000000000000000000000000000000000000000000005eb");
        expect(sixthParam).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000100");
        expect(fourthParamDataLength).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000014");
        expect(fourthParamData).toStrictEqual("746869732069732061206772696e3a20f09f9881000000000000000000000000");
        expect(sixthParamDataLength).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000002");
        expect(sixthParamFirstElOff).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000040");
        expect(sixthParamSecondElOff).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000080");
        expect(sixthParamFirstElLen).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000003");
        expect(sixthParamFirstEl).toStrictEqual("6f6e650000000000000000000000000000000000000000000000000000000000");
        expect(sixthParamSecondElLen).toStrictEqual("0000000000000000000000000000000000000000000000000000000000000003");
        expect(sixthParamSecondEl).toStrictEqual("74776f0000000000000000000000000000000000000000000000000000000000");
        expect(finished).toHaveLength(480);
    });

    it("encodes address", () => {
        const params = new ContractFunctionParams()
            .addAddress("888937961a6E3D313e481a2c5BAd9791fD11ea5b");

        const finished = params._build(null);
        const firstParam = Buffer.from(finished.slice((32 * 0), (32 * 1)).buffer).toString("hex");
        expect(firstParam).toStrictEqual("000000000000000000000000888937961a6e3d313e481a2c5bad9791fd11ea5b");
        expect(finished).toHaveLength(32);
    });
});