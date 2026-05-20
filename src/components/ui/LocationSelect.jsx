import { INDIA_STATES, LOCATION_DATA } from '../../constants'

export default function LocationSelect({ formData, setFormData, errors }) {
  const states = INDIA_STATES
  const districts = formData.state ? Object.keys(LOCATION_DATA[formData.state] || {}) : []

  const handleChange = (field, value) => {
    const resets = {
      state: { district: '' },
      district: { village: '' }
    }

    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...resets[field]
    }))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
      <div className="relative">
        <label className="block mb-2">
          <span className={`font-mono text-[10px] sm:text-[10.5px] tracking-[0.15em] sm:tracking-[0.22em] uppercase ${
            errors.state ? 'text-blood' : 'text-ink-2'
          }`}>
            State *
          </span>
        </label>
        <div className="relative">
          <select
            name="state"
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
            className={`w-full bg-paper border-2 px-4 py-3 font-sans text-sm sm:text-base text-ink appearance-none cursor-pointer transition-all duration-200 ${
              errors.state ? 'border-blood' : 'border-ink'
            } ${!formData.state ? 'opacity-70' : ''}`}
          >
            <option value="">Select your state</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {errors.state && (
          <span className="text-blood text-xs mt-1 block font-mono">{errors.state}</span>
        )}
      </div>

      <div className="relative">
        <label className="block mb-2">
          <span className={`font-mono text-[10px] sm:text-[10.5px] tracking-[0.15em] sm:tracking-[0.22em] uppercase ${
            errors.district ? 'text-blood' : 'text-ink-2'
          }`}>
            District *
          </span>
        </label>
        <div className="relative">
          <select
            name="district"
            value={formData.district}
            onChange={(e) => handleChange('district', e.target.value)}
            disabled={!formData.state}
            className={`w-full bg-paper border-2 px-4 py-3 font-sans text-sm sm:text-base text-ink appearance-none cursor-pointer transition-all duration-200 ${
              errors.district ? 'border-blood' : 'border-ink'
            } ${!formData.state ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <option value="">Select your district</option>
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {errors.district && (
          <span className="text-blood text-xs mt-1 block font-mono">{errors.district}</span>
        )}
      </div>

      <div className="sm:col-span-2">
        <label className="block mb-2">
          <span className="font-mono text-[10px] sm:text-[10.5px] tracking-[0.15em] sm:tracking-[0.22em] uppercase text-ink-2">
            Village / Town Name
          </span>
        </label>
        <input
          type="text"
          name="village"
          value={formData.village}
          onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
          placeholder="Enter your village or town name"
          className="w-full bg-paper border-2 border-ink px-4 py-3 font-sans text-sm sm:text-base text-ink transition-all duration-200 focus:border-saffron-deep focus:shadow-[3px_3px_0_var(--saffron-deep)] focus:outline-none"
        />
      </div>
    </div>
  )
}