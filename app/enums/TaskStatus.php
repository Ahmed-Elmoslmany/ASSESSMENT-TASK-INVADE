<?php

namespace App\enums;

enum TaskStatus : string
{
    case COMPLETED = 'completed';
    case PENDING = 'pending';

    public function getColor(): string
    {
        return match ($this) {
            self::COMPLETED => 'completed',
            self::PENDING => 'pending'
        };
    }
}
