import { useContext } from '@nuxtjs/composition-api'
import { PriorityLabel } from '@/enums/Priority'
import { RequirementServiceLabel } from '@/enums/RequirementService'
import { PriceTypeLabel } from '@/enums/PriceType'
import { RequirementResultLabel } from '@/enums/RequirementResult'

export default function useRequirement() {
    const { i18n } = useContext()

    const priorityLabel = (priority) => {
        return i18n.t('priority.model.' + PriorityLabel[priority])
    }

    const priceTypeLabel = (priceType) => {
        return i18n.t('price_type.model.' + PriceTypeLabel[priceType])
    }

    const resultLabel = (result) => {
        return i18n.t(
            'requirement_result.model.' + RequirementResultLabel[result]
        )
    }

    const requirementServiceLabel = (RequirementService) => {
        return i18n.t(
            'requirement_service.model.' +
                RequirementServiceLabel[RequirementService]
        )
    }

    return {
        priorityLabel,
        priceTypeLabel,
        resultLabel,
        requirementServiceLabel
    }
}
