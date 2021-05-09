<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChannelFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'=>['required','string','min:5','max:20'],
            'cover'=>['required','image'],
            'description'=>['string','max:300']
        ];
    }
    public function messages()
    {
        return [
            'name.required'=>'channel name is required',
            'name.string'=>'channel name should be string',
            'name.min'=>'channel name should be minimum of 5 characters',
            'name.max'=>'channel name should be maximum of 20 characters',
            'cover.required'=>'channel name is required',
            'cover.image'=>'channel profile picture should be image',
            'description.string'=>'description should be string',
            'description.max'=>'description should be maximum of 300 characters'
        ];
    }
}
