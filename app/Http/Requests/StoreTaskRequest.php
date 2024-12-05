<?php

namespace App\Http\Requests;

use App\enums\TaskStatus;
use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

     
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:150',
            'description' => 'required|string|max:300',
            'status' => 'required|in:pending,completed',
            'category_id' => 'required|exists:categories,id',
            'due_date' => 'nullable|date',
        ];
    }
}
