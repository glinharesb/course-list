import { Flex, Heading, Button, Text } from '@chakra-ui/react'
import { useAppContext } from './AppContext'
import { AddIcon } from './Icons'

export const SectionCreateCourse = () => {
  const { courses, setCreatingCourse } = useAppContext()

  return (
    <Flex
      justifyContent="space-between"
      marginBottom="2rem"
      alignItems={{ base: 'center', lg: 'flex-start' }}
    >
      <Flex direction="column" gap={2}>
        <Heading as="h6" size="md" color="#343A40" fontWeight="500">
          Cursos
        </Heading>
        <Text color="#698AAE" fontSize="0.875rem">
          {courses?.length} no total
        </Text>
      </Flex>
      <Button
        gap={2}
        backgroundColor="#004ECC"
        color="#fff"
        _hover={{ backgroundColor: '#004ECC' }}
        onClick={() => setCreatingCourse && setCreatingCourse(true)}
      >
        <AddIcon />
        Criar novo curso
      </Button>
    </Flex>
  )
}
