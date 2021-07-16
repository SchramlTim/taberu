<?php

namespace Taberu\Validator;

class JWT
{
    const HEADER = 0;
    const PAYLOAD = 1;
    const SECRET = 2;

    private $token = null;
    private $tokenParts = [];

    public function __construct(string $token)
    {
        $this->token = $token;
        $this->tokenParts = explode('.', $token);
    }

    public static function generate($userId): string
    {
        $token = [
            self::HEADER => [
                'alg' => 'HS256',
                'typ' => 'JWT'
            ],
            self::PAYLOAD => [
                'iss' => $_SERVER['SERVER_NAME'],
                'sub' => $userId,
                'aud' => $_SERVER['SERVER_NAME'],
                'exp' => strtotime("+1 day", time()),
                'iat' => time()
            ]
        ];

        $headerEncoded = base64_encode(json_encode($token[self::HEADER]));
        $payloadEncoded = base64_encode(json_encode($token[self::PAYLOAD]));
        $signature = hash_hmac('sha256', $headerEncoded . '.' .  $payloadEncoded, $_ENV['JWT_SECRET'], true);
        $signatureEncoded = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        return $headerEncoded . '.' . $payloadEncoded . '.' . $signatureEncoded;
    }

    public function validate(): bool
    {
        if (!count($this->tokenParts)) {
            return false;
        }

        $expectedSignature = hash_hmac('sha256', $this->getPartEncoded(self::HEADER) . '.' .  $this->getPartEncoded(self::PAYLOAD), $_ENV['JWT_SECRET'], true);
        $encodedSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($expectedSignature));

        return hash_equals($encodedSignature, $this->getPartEncoded(self::SECRET));
    }

    public function getPayload(): array
    {
        return json_decode($this->getPartDecoded(self::PAYLOAD), true);
    }

    protected function getPartDecoded(int $part): string
    {
        return base64_decode($this->tokenParts[$part]);
    }

    protected function getPartEncoded(int $part): string
    {
        return $this->tokenParts[$part];
    }
}
