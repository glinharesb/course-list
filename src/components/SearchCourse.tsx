import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  useToast
} from '@chakra-ui/react'
import { useCallback, useRef, useState } from 'react'
import { ICourse } from '../shared/types'
import { useAppContext } from './AppContext'
import { CloseIcon, Search } from './Icons'

export const SearchCourse = () => {
  const { courses, filteredCourses, setFilteredCourses } = useAppContext()
  const seachInputRef = useRef<HTMLInputElement | null>(null)

  const [searchValue, setSearchValue] = useState('')

  const toast = useToast()

  const searchCourse = useCallback(() => {
    if (!seachInputRef || !setFilteredCourses || !courses) return

    const value = removeAccents(seachInputRef.current!.value.toLowerCase())
    const filterCourses = courses.filter(
      (course: ICourse) =>
        removeAccents(course.name.toLowerCase()).indexOf(value) > -1
    )

    if (filterCourses.length === courses.length) return
    if (!filterCourses.length)
      return toast({
        title: 'Nenhum curso encontrado',
        status: 'error',
        isClosable: true
      })

    setFilteredCourses(filterCourses)
  }, [courses, setFilteredCourses, toast])

  const clearSearch = useCallback(() => {
    setFilteredCourses([])
    setSearchValue('')
  }, [setFilteredCourses])

  return (
    <Box
      marginBottom="1rem"
      padding="1.5rem"
      backgroundColor="#fff"
      borderRadius="0.5rem"
      borderColor="#DBE3EC"
      borderWidth="1px"
    >
      <Flex
        height={{ base: 'auto', lg: '3.5rem' }}
        justifyContent="space-between"
        flexDirection={{ base: 'column', lg: 'row' }}
        gap={{ base: '1rem', lg: '2rem' }}
      >
        <InputGroup alignItems="center">
          <Box position="absolute" zIndex="2" left="1rem">
            <Search />
          </Box>
          <Input
            backgroundColor="#F3F6F9"
            placeholder="Busque por nome do curso ou grau"
            _placeholder={{ fontSize: { base: '0.75rem', lg: '1rem' } }}
            paddingLeft="3.5rem"
            height="3.5rem"
            ref={seachInputRef}
            onChange={({ target }) => setSearchValue(target.value)}
            value={searchValue}
            onKeyUp={({ code }) => code === 'Enter' && searchCourse()}
          />
          {searchValue.length > 0 && (
            <Box
              position="absolute"
              zIndex="2"
              right="1rem"
              cursor="pointer"
              onClick={() => setSearchValue('')}
            >
              <CloseIcon fill="#879AAD" />
            </Box>
          )}
        </InputGroup>
        <Button
          paddingX="2.5rem"
          paddingY={{ base: '1rem' }}
          height="initial"
          border="1px solid #004ECC"
          backgroundColor="#fff"
          color="#004ECC"
          onClick={() => searchCourse()}
          _hover={{ backgroundColor: '#fff' }}
        >
          Buscar
        </Button>
        {filteredCourses.length > 0 && (
          <Button
            paddingX="2rem"
            paddingY={{ base: '1rem' }}
            height="initial"
            border="1px solid #fff"
            backgroundColor="#fff"
            color="#004ECC"
            onClick={clearSearch}
            _hover={{ backgroundColor: '#fff' }}
            gap="0.5rem"
          >
            <CloseIcon fill="#004ECC" />
            Limpar
          </Button>
        )}
      </Flex>
    </Box>
  )
}

const removeAccents = (text: string) => {
  if (typeof text !== 'string') return text

  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
