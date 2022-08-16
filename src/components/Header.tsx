import { Box, Flex, Text } from '@chakra-ui/react'
import { BookOpen } from './Icons'

export const Header = () => {
  return (
    <Box
      marginBottom="4.5rem"
      paddingY="1rem"
      paddingX="1.5rem"
      backgroundColor="#EBF0F5"
    >
      <Flex alignItems="center" gap="0.5rem">
        <BookOpen />
        <Text color="#52799A" fontSize="0.875rem">
          Cursos
        </Text>
      </Flex>
    </Box>
  )
}
