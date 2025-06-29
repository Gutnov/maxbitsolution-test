import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CocktailCard from '../ui/CocktailItem.vue'
import type { CocktailItem } from '../model/types'

vi.mock('@/shared/ui/LazyImage.vue', () => ({
  default: {
    name: 'LazyImage',
    props: ['src', 'alt'],
    template: '<img :src="src" :alt="alt" data-testid="lazy-image" />'
  }
}))

describe('CocktailCard', () => {
  const mockCocktailItem: CocktailItem = {
    id: '1',
    name: 'Mojito',
    alternateName: null,
    category: 'Cocktail',
    alcoholic: 'Alcoholic',
    glass: 'Highball glass',
    instructions: 'Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw.',
    image: 'https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg',
    dateModified: '2020-11-30 16:45:27',
    ingredients: [
      { name: 'White rum', measure: '2-3 oz' },
      { name: 'Lime', measure: '1' },
      { name: 'Sugar', measure: '2 tsp' },
      { name: 'Mint', measure: '2-4 leaves' },
      { name: 'Soda water', measure: null }
    ]
  }

  const createWrapper = (cocktailItem: Partial<CocktailItem> = {}) => {
    return mount(CocktailCard, {
      props: {
        cocktailItem: { ...mockCocktailItem, ...cocktailItem }
      }
    })
  }

  describe('Rendering', () => {
    it('should render cocktail name', () => {
      const wrapper = createWrapper()
      
      expect(wrapper.find('.cocktail__title').text()).toBe('Mojito')
    })

    it('should render cocktail instructions', () => {
      const wrapper = createWrapper()
      
      expect(wrapper.find('.cocktail__instructions').text()).toBe(mockCocktailItem.instructions)
    })

    it('should render cocktail image with correct props', () => {
      const wrapper = createWrapper()
      
      const lazyImage = wrapper.findComponent({ name: 'LazyImage' })
      
      expect(lazyImage.exists()).toBe(true)
      expect(lazyImage.props('src')).toBe('https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg')
      expect(lazyImage.props('alt')).toBe('Mojito')
    })

    it('should render empty image src when image is not provided', () => {
      const wrapper = createWrapper({ image: undefined })
      const lazyImage = wrapper.findComponent({ name: 'LazyImage' })
      
      expect(lazyImage.exists()).toBe(true)
      expect(lazyImage.props('src')).toBe('')
    })
  })

  describe('Tags', () => {
    it('should render all tags when all values are provided', () => {
      const wrapper = createWrapper()
      const tags = wrapper.findAll('.cocktail__tag')
      
      expect(tags).toHaveLength(3)
      expect(tags[0].text()).toBe('Cocktail')
      expect(tags[1].text()).toBe('Alcoholic')
      expect(tags[2].text()).toBe('Highball glass')
    })

    it('should filter out empty tags', () => {
      const wrapper = createWrapper({
        category: 'Cocktail',
        alcoholic: '',
        glass: 'Highball glass'
      })
      const tags = wrapper.findAll('.cocktail__tag')
      
      expect(tags).toHaveLength(2)
      expect(tags[0].text()).toBe('Cocktail')
      expect(tags[1].text()).toBe('Highball glass')
    })

    it('should not render any tags when all values are empty', () => {
      const wrapper = createWrapper({
        category: '',
        alcoholic: '',
        glass: ''
      })
      const tags = wrapper.findAll('.cocktail__tag')
      
      expect(tags).toHaveLength(0)
    })
  })

  describe('Ingredients Table', () => {
    it('should render ingredients table with correct headers', () => {
      const wrapper = createWrapper()
      const headers = wrapper.findAll('th')
      
      expect(headers).toHaveLength(2)
      expect(headers[0].text()).toBe('Ingredient')
      expect(headers[1].text()).toBe('Measure')
    })

    it('should render all ingredients with measures', () => {
      const wrapper = createWrapper()
      const rows = wrapper.findAll('.cocktail__ingredient-row')
      
      expect(rows).toHaveLength(5)
      
      const firstRowCells = rows[0].findAll('td')
      expect(firstRowCells[0].text()).toBe('White rum')
      expect(firstRowCells[1].text()).toBe('2-3 oz')
      
      const lastRowCells = rows[4].findAll('td')
      expect(lastRowCells[0].text()).toBe('Soda water')
      expect(lastRowCells[1].text()).toBe('-')
    })

    it('should display dash for ingredients without measure', () => {
      const wrapper = createWrapper({
        ingredients: [
          { name: 'Ingredient 1', measure: null },
          { name: 'Ingredient 3', measure: '' }
        ]
      })
      const rows = wrapper.findAll('.cocktail__ingredient-row')
      
      rows.forEach(row => {
        const measureCell = row.findAll('td')[1]
        expect(measureCell.text()).toBe('-')
      })
    })
  })

  describe('Structure and Classes', () => {
    it('should have correct CSS classes for main structure', () => {
      const wrapper = createWrapper()
      
      expect(wrapper.find('.cocktail').exists()).toBe(true)
      expect(wrapper.find('.cocktail__info').exists()).toBe(true)
      expect(wrapper.find('.cocktail__image').exists()).toBe(true)
    })

    it('should render instructions and ingredients sections', () => {
      const wrapper = createWrapper()
      const subtitles = wrapper.findAll('.cocktail__subtitle')
      
      expect(subtitles).toHaveLength(2)
      expect(subtitles[0].text()).toBe('Instruction:')
      expect(subtitles[1].text()).toBe('List of ingredients:')
    })
  })

  describe('Props validation', () => {
    it('should handle minimal cocktail data', () => {
      const minimalCocktail: CocktailItem = {
        id: '2',
        name: 'Simple Drink',
        alternateName: null,
        category: '',
        alcoholic: '',
        glass: '',
        instructions: 'Just drink it',
        image: '',
        dateModified: null,
        ingredients: []
      }
      
      const wrapper = createWrapper(minimalCocktail)
      
      expect(wrapper.find('.cocktail__title').text()).toBe('Simple Drink')
      expect(wrapper.find('.cocktail__instructions').text()).toBe('Just drink it')
      expect(wrapper.findAll('.cocktail__tag')).toHaveLength(0)
      expect(wrapper.findAll('.cocktail__ingredient-row')).toHaveLength(0)
    })
  })
})