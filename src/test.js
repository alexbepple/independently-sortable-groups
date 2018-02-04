import {assertThat, is} from 'hamjest'

const overlap = (a1, a2) => Math.max(...a1) > Math.min(...a2)

const getIndependentlySortableGroups = arr =>
  arr.length === 0
  ? []
  : arr.slice(1).reduce((acc, val, idx, arr) => {
    const currGroup = acc[acc.length - 1]
    if (overlap(currGroup, arr.slice(idx))) {
      const extendedGroup = currGroup.concat([val])
      return acc.slice(0, acc.length - 1).concat([extendedGroup])
    }
    return acc.concat([[val]])
  }, [[arr[0]]])

const solution = arr => getIndependentlySortableGroups(arr).length

describe('#getIndependentlySortableGroups', () => {
  it('empty array has no sortable groups', () => {
    assertThat(getIndependentlySortableGroups([]), is([]))
  })
  it('in mono desc array whole array is one group', () => {
    assertThat(getIndependentlySortableGroups([2, 1]), is([[2, 1]]))
  })
  it('in mono asc array every element is its own group', () => {
    assertThat(getIndependentlySortableGroups([1, 2]), is([[1], [2]]))
  })
  it('finds mono desc groups that do not contain an item that comes later', () => {
    assertThat(getIndependentlySortableGroups([3, 1, 2]), is([[3, 1, 2]]))
  })
  it('passes test from website', () => {
    assertThat(getIndependentlySortableGroups([1, 5, 4, 9, 8, 7, 12, 13, 14]), is([
      [1], [5, 4], [9, 8, 7], [12], [13], [14]
    ]))
  })
})
