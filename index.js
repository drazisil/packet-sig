import { getPacketSignatures  } from "./PacketSignature"


/**
 *
 *
 * @author Drazi Crendraven
 * @param {Buffer} inputBuffer
 */
function sayHello(inputBuffer) {
    console.log("Hello!")
}

/** @type {import("./PacketSignature").PacketSignatureRecord[]} */
const initialSignatures = [
    {
        signature: Buffer.from([0x21, 0x3c, 0x61, 0x72, 0x63, 0x68, 0x3e]),
        name: 'ar archive',
        packetHandlerFunction: sayHello
    },
    {
        signature: Buffer.from([0xcf, 0xfa, 0xed, 0xfe]),
        name: 'mac executable',
        packetHandlerFunction: sayHello
    },
    {
        signature: Buffer.from([0x7f, 0x45, 0x4c, 0x46]),
        name: 'elf executable',
        packetHandlerFunction: sayHello
    },
    {
        signature: Buffer.from([0x4d, 0x5a]),
        name: 'dos mz executable',
        packetHandlerFunction: sayHello
    },
]

const signatures = getPacketSignatures()

signatures.addFileSignature(
    'SSL Handshake',
    Buffer.from([0x16]),
    sayHello
)



