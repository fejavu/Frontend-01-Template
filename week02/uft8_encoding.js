/**
 * UTF16Encoding(cp)
 * The UTF16Encoding of a numeric code point value, cp, is determined as follows:
1. Assert: 0 ≤ cp ≤ 0x10FFFF.
2. If cp ≤ 0xFFFF, return cp.
3. Let cu1 be floor((cp - 0x10000) / 0x400) + 0xD800.
4. Let cu2 be ((cp - 0x10000) modulo 0x400) + 0xDC00.
5. Return the code unit sequence consisting of cu1 followed by cu2.
 */

function utf8_encoding() {
  
}