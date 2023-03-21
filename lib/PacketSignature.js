/**
 *
 *
 * @author Drazi Crendraven
 * @export
 * @typedef {(inputBuffer: Buffer) => void} PacketHandlerFunction
 */
/**
 *
 *
 * @author Drazi Crendraven
 * @export
 * @typedef PacketSignatureRecord
 * @property {string} name
 * @property {Buffer} signature
 * @property {PacketHandlerFunction} packetHandlerFunction
 */
/** Class for manager file signatures (sometimes known as magic numbers) */

class PacketSignature {

    /**
     *
     * @private
     * @author Drazi Crendraven
     * @type {PacketSignatureRecord[]}
     * @memberof SigDB
     */
    _fileSignatures;

    /**
     *
     * @private
     * @author Drazi Crendraven
     * @type {string[]}
     * @memberof PacketSignature
     */
    _nameList = [];

    /** @deprecated please use loadSignatureDatabase() instead */
    constructor() {
        /** @type {PacketSignatureRecord[]} */
        this.fileSignatures = [];
    }

    /**
     * Provided a buffer of binary bytes, will return either the matching signature as a string, or `undefined`
     *
     * @param {Buffer} haystack
     * @memberof SigDB
     * @returns {string}
     */
    getName(haystack) {
        const result = this.fileSignatures.find(sig => {
            return sig.signature.equals(haystack.subarray(0, sig.signature.length));
        });
        if (typeof result === "undefined") {
            return "UNKNOWN"
        }
        return result["name"]
    }

    /**
     *
     *
     * @author Drazi Crendraven
     * @param {Buffer} haystack
     * @returns {PacketHandlerFunction}  
     * @memberof PacketSignature
     */
    getHandler(haystack) {
        const result = this.fileSignatures.find(sig => {
            return sig.signature.equals(haystack.subarray(0, sig.signature.length));
        });
        if (typeof result === "undefined") {
            throw new Error('Handler function not found')
        }
        return result["packetHandlerFunction"]
    }


    /**
     *
     * @private
     * @author Drazi Crendraven
     * @memberof PacketSignature
     */
    _updateNames() {
        const results = [];
        for (const entry of this.fileSignatures) {
            results.push(entry.name);
        }
        this._nameList = results;

    }

    /**
     * Get an array of signature names in the database
     * @memberof SigDB
     * @returns {string[]}
     */
    getAllNames() {
        const results = [];
        for (const entry of this.fileSignatures) {
            results.push(entry.name);
        }
        return results;
    }

    /**
     * Add a file signature
     * @param {string} name
     * @param {Buffer} signature
     * @param {PacketHandlerFunction} packetHandlerFunction
     */
    addFileSignature(name, signature, packetHandlerFunction) {
        this.fileSignatures.push({ name, signature, packetHandlerFunction });
        this._updateNames();
    }
}
/**
 *
 *
 * @author Drazi Crendraven
 * @export
 * @returns {PacketSignature}
 */

export function getPacketSignatures() {
    return new PacketSignature();
}
