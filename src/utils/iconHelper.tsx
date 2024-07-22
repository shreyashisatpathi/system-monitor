import { Group, Text } from '@mantine/core';
import { IconSortDescending } from '@tabler/icons-react';
export const tableHeaderWithIcon = (name: string) => {
    return (
      <Group>
        <Text>{name}</Text>
        <IconSortDescending />
      </Group>
    );
  };