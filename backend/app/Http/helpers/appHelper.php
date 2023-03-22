<?php


function x_encode_or_null($val)
{
	return isset($val) ? \Hashids::encode($val) : $val;
}

function x_decode_ids($array, $parent = null)
{
	foreach ($array as $key => $val) {

		// skip nulls
		if (is_null($val)) {
			continue;
		}
		// skip dataSourceId // TODO - change these to integer ids OR rename to dataSourceKey
		else if ($key == 'dataSourceId') {
			continue;
		}
		// skip $loader->map
		else if ($key == 'map') {
			continue;
		}
		// TODO - change this to match patter of other ids
		else if ($key == 'ignore') {
			$array[$key] = collect(json_decode($val, true))
				->map(function ($hashId) {
					return \Hashids::decode($hashId)[0] ?? $hashId;
				})
				->toJson();
		}
		// TODO - change this to match patter of other ids
		else if ($key == 'dependencies') {
			$array[$key] = collect(explode(',', $val))
				->map(function ($item) {
					return \Hashids::decode($item)[0] ?? $item;
				})
				->implode(',');
		}
		// decode id
		else if (strtolower(substr($key, -2)) == 'id') {
			$array[$key] = \Hashids::decode($val)[0] ?? $val;
		}
		// decode array of ids
		else if (strtolower(substr($key, -3)) == 'ids' && is_array($val)) {
			foreach ($val as $subKey => $subVal) {
				$array[$key][$subKey] = \Hashids::decode($subVal)[0] ?? $subVal;
			}
		}

		// decode fieldValue (used in bulk update)
		else if ($key == 'fieldKey' && strtolower(substr($val, -2)) == 'id') {
			$array['fieldValue'] = \Hashids::decode($array['fieldValue'])[0] ?? $array['fieldValue'];
		}

		// decode comma separated string of ids
		else if (strtolower(substr($key, -3)) == 'ids' && !is_array($val)) {
			$array[$key] = collect(explode(',', $val))
				->map(function ($item) {
					return \Hashids::decode($item)[0] ?? $item;
				})
				->implode(',');
		}
		// recursive for nested objects
		else if (is_array($val) || is_object($val)) {
			$array[$key] = x_decode_ids($val, $array);
		}
	}

	return $array;
}
