import './encoding-japanese.min.js';

function GB18030enc(str) {
    const bytes = Encoding.convert(
        Encoding.stringToCode(str),
        {to: 'GB18030', from: 'UNICODE'}
    );
    return bytes.map(b => '%' + b.toString(16).padStart(2, '0').toUpperCase()).join('');
}

function GB18030dec(urlEncoded) {
    // 移除非百分号编码字符（如字母、数字），仅保留 %XX 格式
    const hexStrings = urlEncoded.match(/%[0-9a-fA-F]{2}/g) || [];
    const bytes = new Uint8Array(hexStrings.length);
    hexStrings.forEach((hex, index) => {
        // 解析 % 后的两位十六进制数
        bytes[index] = parseInt(hex.slice(1), 16);
    });
    return new TextDecoder('gb18030').decode(bytes);
}

export default {
    encode: GB18030enc,
    decode: GB18030dec
}