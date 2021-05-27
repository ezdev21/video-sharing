<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChannelEditRequest extends FormRequest
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
            'cover'=>['image'],
            'background'=>['image'],
            'description'=>['string','max:200']
        ];
    }
    public function messages()
    {
        return [
            'name.required'=>'channel name is required',
            'name.string'=>'channel name should be string',
            'name.min'=>'channel name should be minimum of 5 characters',
            'name.max'=>'channel name should be maximum of 20 characters',
            'background.image'=>'channel background should be type of image',
            'cover.image'=>'channel profile picture should be type of image',
            'description.string'=>'description should be string',
            'description.max'=>'description should be maximum of 200 characters'
        ];
    }
}
