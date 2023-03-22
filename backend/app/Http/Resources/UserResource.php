<?php

namespace App\Http\Resources;


class UserResource extends BaseResource
{
	/**
	 * Transform the resource into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array
	 */

	public function toArray($request)
	{
		return [
			'id'     => x_encode_or_null($this->id),
            'email'  => $this->email,
            '_token' => $this->createToken('Personal_token')->accessToken,
            'country' => $this->selected_country,
            'language' => $this->selected_language,
            'category' => $this->selected_category,
		];
	}
}