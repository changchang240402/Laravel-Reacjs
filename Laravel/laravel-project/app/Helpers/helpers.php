<?php
if (!function_exists('base62EncodeHex')) {
    /**
     * Encode a hexadecimal string using Base62.
     *
     * @param string $hex The hexadecimal string to encode.
     * @return string The Base62 encoded string.
     */
    function base62Encode($data) {
        $chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $base = strlen($chars);
        $result = '';
    
        while (bccomp($data, '0') > 0) {
            $remainder = bcmod($data, $base);
            $data = bcdiv($data, $base);
            $result = $chars[$remainder] . $result;
        }
    
        return $result;
    }
}

if (!function_exists('generateShortHash')) {
    /**
     * Generate a short hash for a given URL.
     *
     * @param string $url The URL to hash.
     * @return string The short hash.
     */
    function generateShortHash($url) {
        // Generate MD5 hash of the URL
        $md5Hash = md5($url);

        // Encode the hexadecimal MD5 hash in Base62
        return base62Encode($md5Hash);
    }
}

