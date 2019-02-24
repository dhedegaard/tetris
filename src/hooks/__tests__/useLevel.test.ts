import useLevel, { calculateTickRate } from '../useLevel'

describe(useLevel.name, () => {
  describe(calculateTickRate.name, () => {
    it('should correctly calculate a few examples', () => {
      expect(calculateTickRate(0)).toBe(0.8)
      expect(calculateTickRate(10)).toBe(0.08)
      expect(calculateTickRate(11)).toBe(0.08)
      expect(calculateTickRate(12)).toBe(0.08)
      expect(calculateTickRate(13)).toBe(0.07)
      expect(calculateTickRate(20)).toBe(0.03)
      expect(calculateTickRate(1000)).toBe(0.02)
    })
  })
})
