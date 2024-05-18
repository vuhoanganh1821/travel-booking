'use client'
import { useState, useEffect } from 'react'
import * as React from 'react'
import Tippy from '@tippyjs/react/headless'
import { Search2Icon } from '@chakra-ui/icons'
import {
  InputGroup,
  InputLeftElement,
  HStack,
  Button,
  VStack,
  Input,
} from "@chakra-ui/react";
import SearchItem from "./SearchItem";
import { useDebounce } from "hooks";
import { useStores } from "hooks";
import { observer } from "mobx-react";
import { ISearch, ITour } from "interfaces/tour";

interface ISearchInputProps {
  name?: string
  value?: string
  placeholder?: string
  defaultValue?: string
}

const SearchBarInput = (props: ISearchInputProps) => {
  const { tourStore } = useStores()
  const { suggestions } = tourStore
  const { value, placeholder, name, defaultValue } = props
  const [isShow, setIsShow] = useState<boolean>(true)
  const [searchResult, setSearchResult] = useState(false)
  const [inputValue, setInputValue] = useState<string>("")
  const debounceVal = useDebounce({ value: inputValue, delay: 500 })

  const handleClickOutSide = () => {
    setIsShow(false)
  }

  useEffect(() => {
    if (!debounceVal.trim()) {
      setSearchResult(false)
      return
    }
    tourStore.fetchSearchTour(debounceVal)
    setSearchResult(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceVal])

  return (
    <Tippy
      interactive
      visible={isShow && searchResult}
      render={() => (
        <VStack
          alignItems="center"
          justifyContent="center"
          width="515px"
          minHeight="100px"
          maxHeight="min(-156px + 100vh, 734px)"
          borderRadius="8px"
          padding="8px 16px 16px 16px"
          background="#fff"
          boxShadow="rgba(0, 0, 0, 0.12) 0px 2px 12px"
        >
          {suggestions.map((tours) => (
            <SearchItem
              key={tours?._id}
              imgsrc={tours?.thumbnail}
              title={tours?.title}
            />
          ))}
        </VStack>
      )}
      onClickOutside={handleClickOutSide}
    >
      <HStack
        width="515px"
        height="56px"
        background="#fff"
        borderRadius="44px"
        border="2px solid #dcdfe4"
        justifyContent="space-between"
        padding="0px 8px"
        _focusWithin={{
          borderColor: "#64CCC5",
        }}
      >
        <InputGroup padding="0px 16px">
          <InputLeftElement pointerEvents="none" width="40px" height="40px">
            <Search2Icon color="#1A2B49" boxSize="20px" />
          </InputLeftElement>
          <Input
            value={inputValue}
            placeholder={placeholder}
            paddingLeft={10}
            border="none"
            focusBorderColor="transparent"
            fontSize="xl"
            fontWeight="700"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onFocus={() => {
              setIsShow(true)
            }}
          />
        </InputGroup>
        <Button
          width="115px"
          height="42px"
          backgroundColor="#64CCC5"
          color="#fff"
          fontSize="xl"
          borderRadius="99px"
          transition="background .2s ease-out"
          _hover={{
            background: "#176B87",
            borderColor: "#64CCC5",
          }}
        >
          Search
        </Button>
      </HStack>
    </Tippy>
  )
}

export default observer(SearchBarInput)
