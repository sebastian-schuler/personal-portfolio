import { createStyles, MultiSelect, Text } from '@mantine/core'
import { IconHash } from '@tabler/icons-react'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

const useStyles = createStyles((theme) => ({
    searchInput: {
        '::placeholder': {
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[5]
        },
    },
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
            }}
        />
    )
}

export default PortfolioFilter