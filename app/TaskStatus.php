<?php

namespace App;

enum TaskStatus : string
{
    case COMPLETED = 'Completed';
    case PENDING = 'Pending';

    public function getColor(): string
    {
        return match ($this) {
            self::COMPLETED => 'completed',
            self::PENDING => 'pending'
        };
    }
}
