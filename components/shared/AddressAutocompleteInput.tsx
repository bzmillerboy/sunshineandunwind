'use client'
import {
  CircleF,
  GoogleMap,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api'
import { useMemo, useState } from 'react'
import { MdLocationOn } from 'react-icons/md'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { CommandFloatingLabelInput } from '@/components/ui/floatinglabel'

export default function AddressAutocompleteInput(props: any) {
  const libraries = useMemo(() => ['places'], [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  })

  if (!isLoaded) {
    return <p>Loading...</p>
  }
  return (
    <>
      <div>
        {/* render Places Auto Complete and pass custom handler which updates the state */}
        <PlacesAutocomplete
          onAddressSelect={(address) => {
            getGeocode({ address: address }).then((results) => {
              // console.log('results:', results)
              const county = results[0].address_components.find(
                (res) => res.types[0] === 'administrative_area_level_2',
              )?.long_name
              const state = results[0].address_components.find(
                (res) => res.types[0] === 'administrative_area_level_1',
              )
              const streetNumber = results[0].address_components.find(
                (res) => res.types[0] === 'street_number',
              )?.long_name
              const streetName = results[0].address_components.find(
                (res) => res.types[0] === 'route',
              )?.long_name
              const city = results[0].address_components.find(
                (res) => res.types[0] === 'locality',
              )?.long_name
              const postalCode = results[0].address_components.find(
                (res) => res.types[0] === 'postal_code',
              )?.long_name
              props.updateLocation({
                address: `${streetNumber} ${streetName}`,
                city: city || null,
                state: state?.long_name || null,
                stateAbbr: state?.short_name || null,
                postalCode: postalCode || null,
                county: county || null,
                placeId: results[0].place_id,
                addressComponents: {
                  streetAddress: `${streetNumber} ${streetName}` || null,
                  city: city || null,
                  state: state?.long_name || null,
                  stateAbbr: state?.short_name || null,
                  postalCode: postalCode || null,
                },
              })
            })
          }}
          {...props}
        />
      </div>
    </>
  )
}

interface PlacesAutocompleteProps {
  onAddressSelect?: (address: string) => void
}

const PlacesAutocomplete = (props: any) => {
  const { onAddressSelect, setAddressValue, label } = props

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    },
    debounce: 300,
    cache: 86400,
  })

  const renderSuggestions = () => {
    return data
      .filter(
        (s) =>
          s.types.includes('street_address') || s.types.includes('premise'),
      )
      .map((suggestion) => {
        const {
          place_id,
          structured_formatting: {
            main_text,
            secondary_text,
            main_text_matched_substrings,
          },
          description,
        } = suggestion
        // console.log('suggestion:', suggestion)

        return (
          <CommandItem
            key={place_id}
            value={description}
            onSelect={() => {
              setValue(description, false)
              clearSuggestions()
              onAddressSelect && onAddressSelect(description)
            }}
          >
            <div className="flex items-center">
              <MdLocationOn className="w-6 h-6 mr-2" />
              <div>
                <p className="font-normal">
                  {main_text.split('').map((char, index) => {
                    const isBold =
                      index >= 0 &&
                      index < main_text_matched_substrings[0]?.length
                    return (
                      <span
                        key={index}
                        style={{ fontWeight: isBold ? 'bold' : 'normal' }}
                      >
                        {char}
                      </span>
                    )
                  })}
                </p>
                <p className="text-sm text-neutral-500 leading-4">
                  {secondary_text}
                </p>
              </div>
            </div>
          </CommandItem>
        )
      })
  }

  return (
    <Command>
      <CommandFloatingLabelInput
        id={props.id}
        value={props.field.value}
        onValueChange={(value) => {
          // Set Google Maps Places Autocomplete to the value of the input
          setValue(value)
          // Set Address field value to the value of the input
          setAddressValue(value)
        }}
        disabled={!ready || props.field.disabled}
        placeholder="Search an address"
        className="combobox-input"
        label={label}
      />

      <CommandList className="">
        {status === 'OK' && renderSuggestions()}
      </CommandList>
    </Command>
  )
}
