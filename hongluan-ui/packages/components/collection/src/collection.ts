import { ref, inject, onMounted, onBeforeUnmount, provide, unref } from 'vue'
import Collection from './collection.vue'
import CollectionItem from './collection-item.vue'

import type { InjectionKey, SetupContext } from 'vue'
import type {
  CollectionInjectionContext,
  CollectionItemInjectionContext,
} from './tokens'

export const COLLECTION_ITEM_SIGN = `data-collection-item`

// Make sure the first letter of name is capitalized
export const createCollectionWithScope = (name: string) => {
  const COLLECTION_NAME = `${name}Collection`
  const COLLECTION_ITEM_NAME = `${COLLECTION_NAME}Item`
  const COLLECTION_INJECTION_KEY: InjectionKey<CollectionInjectionContext> =
    Symbol(COLLECTION_NAME)
  const COLLECTION_ITEM_INJECTION_KEY: InjectionKey<CollectionItemInjectionContext> =
    Symbol(COLLECTION_ITEM_NAME)

  const HlCollection = {
    ...Collection,
    name: COLLECTION_NAME,
    setup() {
      const collectionRef = ref<HTMLElement | null>(null)
      const itemMap: CollectionInjectionContext['itemMap'] = new Map()
      const getItems = () => {
        const collectionEl = unref(collectionRef)

        if (!collectionEl) return []
        const orderedNodes = Array.from(
          collectionEl.querySelectorAll(`[${COLLECTION_ITEM_SIGN}]`),
        )

        const items = [...itemMap.values()]

        return items.sort(
          (a, b) => orderedNodes.indexOf(a.ref!) - orderedNodes.indexOf(b.ref!),
        )
      }

      provide(COLLECTION_INJECTION_KEY, {
        itemMap,
        getItems,
        collectionRef,
      })
    },
  }

  const HlCollectionItem = {
    ...CollectionItem,
    name: COLLECTION_ITEM_NAME,
    setup(_: unknown, { attrs }: SetupContext) {
      const collectionItemRef = ref<HTMLElement | null>(null)
      const collectionInjection = inject(COLLECTION_INJECTION_KEY, undefined)

      provide(COLLECTION_ITEM_INJECTION_KEY, {
        collectionItemRef,
      })

      onMounted(() => {
        const collectionItemEl = unref(collectionItemRef)
        if (collectionItemEl) {
          collectionInjection!.itemMap.set(collectionItemEl, {
            ref: collectionItemEl,
            ...attrs,
          })
        }
      })

      onBeforeUnmount(() => {
        const collectionItemEl = unref(collectionItemRef)
        collectionInjection!.itemMap.delete(collectionItemEl!)
      })
    },
  }

  return {
    COLLECTION_INJECTION_KEY,
    COLLECTION_ITEM_INJECTION_KEY,
    HlCollection,
    HlCollectionItem,
  }
}
