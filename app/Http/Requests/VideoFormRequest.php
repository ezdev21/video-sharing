<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VideoFormRequest extends FormRequest
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
            'title'=>['required','string','min:3','max:50'],
            'cover'=>['required','image'],
            'video'=>['required','video']
        ];
    }
    public function messages()
    {
        return [
            'title.required'=>'video title is required',
            'title.string'=>'video title should be string',
            'title.min'=>'video title should be minimum of 3 characters',
            'title.max'=>'video title should be maximum of 50 characters',
            'cover.required'=>'video cover is required',
            'cover.image'=>'video cover should be an image',
            'video.required'=>'video file is required',
            'video.video'=>'only videom file should be uploaded'
        ];
    }
}
