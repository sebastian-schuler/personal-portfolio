import { Box, createStyles, MultiSelect, Text } from '@mantine/core'
import { IconHash } from '@tabler/icons-react'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

const useStyles = createStyles((theme) => ({
    searchInput: {
        '::placeholder': {
            color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[5]
        },
    },
    item: {
        color: theme.colorScheme === 'dark' ? 'white' : 'black',
        fontSize: '0.8rem',
    }
}));

interface Props {
    tags: string[]
    setFilter: (filter: string[] | undefined) => void
    filter: string[] | undefined
}

const PortfolioFilter: React.FC<Props> = ({ tags, setFilter, filter }: Props) => {

    const { t } = useTranslation('portfolio');
    const { classes } = useStyles();

    return (
        <Box mt={'xl'} mb={'lg'}>
        <MultiSelect
            data={tags}
            placeholder={t('filterPlaceholder')}
            size="md"
            value={filter}
            onChange={(value) => setFilter(value)}
            dropdownPosition="top"
            icon={<IconHash />}
            clearable
            classNames={{
                searchInput: classes.searchInput,
                item: classes.item,
            }}
        />
        </Box>
    )
}

export default PortfolioFilter