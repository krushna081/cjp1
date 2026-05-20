import { useState, useMemo } from 'react'

const locationData = {
  'Maharashtra': {
    'Mumbai': {
      'Mumbai City': ['Marine Lines', 'Fort', 'Dadar', 'Worli', 'Bandra', 'Colaba', 'Cumballa Hill'],
      'Mumbai Suburban': ['Andheri', 'Borivali', 'Kurla', 'Ghatkopar', 'Malad', 'Kandivali', 'Jogeshwari'],
    },
    'Pune': {
      'Pune City': ['Koregaon Park', 'Shivaji Nagar', 'Swargate', 'Hadapsar', 'Khadki', 'Deccan', 'Bund Garden'],
      'Pune Rural': ['Hinjewadi', 'Baner', 'Wakad', 'Chinchwad', 'Talegaon', 'Maval', 'Bhor'],
    },
    'Nagpur': {
      'Nagpur City': ['Sitabuldi', 'Mahal', 'Dharampeth', 'Lakadganj', 'Mankapur', 'Ramdaspeth'],
      'Nagpur Rural': ['Kamthi', 'Savner', 'Parseoni', 'Bhiwapur', 'Narkhed', 'Kamptee'],
    },
    'Nashik': {
      'Nashik City': ['Panchavati', 'Nashik Road', 'Gangapur', 'Cidco', 'Sharanpur', 'Mahatma Nagar'],
      'Nashik Rural': ['Sinnar', 'Dindori', 'Yeola', 'Satana', 'Igatpuri', 'Trimbakeshwar'],
    },
    'Aurangabad': {
      'Aurangabad City': ['Cidco', 'N-8', 'Jalna Road', 'Beed Bypass', 'Garkheda', 'Jauhari'],
      'Aurangabad Rural': ['Paithan', 'Gangapur', 'Vaijapur', 'Kannad', 'Sillod', 'Khultabad'],
    },
    'Thane': {
      'Thane City': ['Naupada', 'Kopari', 'Uthalsar', 'Ram Maruti Road', 'Makham'],
      'Thane Rural': ['Dombivli', 'Kalyan', 'Ulhasnagar', 'Shahapur', 'Bhiwandi'],
    },
  },
  'Delhi': {
    'New Delhi': {
      'Connaught Place': ['Middle Circle', 'Inner Circle', 'Outer Circle', 'Jai Singh Road'],
      'Lutyens': ['India Gate', 'Rashtrapati Bhavan', 'Rajpath', 'Safdarjung Lane'],
    },
    'South Delhi': {
      'Saket': ['Select City Walk', 'Qutub Minar', 'Greater Kailash', 'PVR Anupam'],
      'Hauz Khas': ['Hauz Khas Village', 'Green Park', 'R.K. Puram', 'Munirka'],
    },
    'North Delhi': {
      'Old Delhi': ['Chandni Chowk', 'Red Fort', 'Sadar Bazaar', 'Karol Bagh'],
      'Rohini': ['Sector 1-15', 'Rohini Courts', 'Rithala', 'Begumpur'],
    },
    'East Delhi': {
      'Preet Vihar': ['Anand Vihar', 'Krishna Nagar', 'Laxmi Nagar', 'Geeta Colony'],
      'Mayur Vihar': ['Phase 1-3', 'Trilokpuri', 'Pandav Nagar', 'Vinod Nagar'],
    },
    'West Delhi': {
      'Rajouri Garden': ['Janakpuri', 'Tilak Nagar', 'Vikaspuri', 'Hari Nagar'],
      'Dwarka': ['Sector 1-23', 'Dwarka Mor', 'Najafgarh', 'Bindola'],
    },
  },
  'Karnataka': {
    'Bangalore': {
      'Bangalore Urban': ['Whitefield', 'MG Road', 'Jayanagar', 'Marthahalli', 'Electronic City', 'Koramangala', 'Indiranagar'],
      'Bangalore Rural': ['Nelamangala', 'Devanhalli', 'Anekal', 'Hoskote', 'Doddaballapur'],
    },
    'Mysore': {
      'Mysore City': ['Chamundipuram', 'KRS Road', 'Siddartha Layout', 'Jayalakshmipuram'],
      'Mysore Rural': ['Nanjangud', 'T-Narsipur', 'Hunsur', 'Krishnanagara'],
    },
    'Hubli-Dharwad': {
      'Hubli': ['Hubli Dharwad Main Road', 'Ganeshpet', 'Vidyagiri', 'Navanagar'],
      'Dharwad': ['Sattur', 'Halyal', 'Maldinnatti', 'Toll gully'],
    },
    'Mangalore': {
      'Mangalore City': ['Hampankatta', 'Bunder', 'Valencia', 'Kankanady', 'Bejai'],
      'Mangalore Rural': ['Bantwal', 'Beltangadi', 'Puttur', 'Moodbidri'],
    },
  },
  'Tamil Nadu': {
    'Chennai': {
      'Chennai Central': ['T Nagar', 'Anna Nagar', 'Vadapalani', 'Kilpauk', 'Nungambakkam'],
      'Chennai South': ['Adyar', 'Thiruvanmiyur', 'Velachery', 'Medavakkam', 'Sholinganallur'],
      'Chennai North': ['Tondiarpet', 'Kodungaiyur', 'Madhavaram', 'Manali', 'Minjur'],
      'Chennai East': ['Perambur', 'Kolathur', 'Pattabiram', 'Madipakkam', 'Ramapuram'],
    },
    'Coimbatore': {
      'Coimbatore North': ['Peelamedu', 'Pappanaickenpalayam', 'R.S. Puram', 'Town Hall'],
      'Coimbatore South': ['Gandhipuram', 'Race Course', 'Ukadam', 'Vadavalli', 'Saravanampatti'],
    },
    'Madurai': {
      'Madurai Central': ['Mattuthavani', 'K.K. Nagar', 'Anna Nagar', 'Tallakulam'],
      'Madurai North': ['Thirumangalam', 'Usilampatti', 'Madurai East'],
    },
    'Salem': {
      'Salem City': ['Fairlands', 'Hasthampatti', 'Omalur', 'Swami Saram'],
      'Salem Rural': ['Mettur', 'Attur', 'Sankagiri', 'Kolathur'],
    },
  },
  'West Bengal': {
    'Kolkata': {
      'Kolkata Central': ['BBD Bagh', 'Park Street', 'Esplanade', 'Dalhousie'],
      'Kolkata South': ['Jadavpur', 'Ballygunge', 'Gariahat', 'Tollygunge', 'New Alipore'],
      'North Kolkata': ['College Square', 'Shyambazar', 'Garia', 'Baguiati', 'Salt Lake'],
      'East Kolkata': ['Topsia', 'Tangra', 'Bhowanipore', 'Bhawanipore'],
    },
    'Howrah': {
      'Howrah City': ['Shibpur', 'Belur', 'Santragachi', 'Bally', 'Domjur'],
      'Howrah Rural': ['Uluberia', 'Amta', 'Bagnan', 'Shibpur'],
    },
    'Siliguri': {
      'Siliguri City': ['Mahatma Gandhi Road', 'Buridwar', 'Prakash Nagar'],
      'Siliguri Rural': ['Matigara', 'Naxalbari', 'Phansidewa', 'Kharibari'],
    },
  },
  'Gujarat': {
    'Ahmedabad': {
      'Ahmedabad City': ['Navrangpura', 'SG Highway', 'Maninagar', 'Prahlad Nagar', 'Thaltej', 'Ghatlodia'],
      'Ahmedabad Rural': ['Dholka', 'Sanand', 'Gandhinagar', 'Kalol', 'Viramgam'],
    },
    'Surat': {
      'Surat City': ['Ring Road', 'Udhna', 'Varachha', 'Katargam', 'Athwa', 'Dumas'],
      'Surat Rural': ['Bardoli', 'Mahuvar', 'Mandvi', 'Olpad', 'Kamrej'],
    },
    'Vadodara': {
      'Vadodara City': ['Alkapuri', 'Fatehgunj', 'Sayajigunj', 'Akota', 'Subhanpura'],
      'Vadodara Rural': ['Dabhoi', 'Karjan', 'Shinor', 'Vaghodia', 'Padra'],
    },
    'Rajkot': {
      'Rajkot City': ['150 Feet Road', 'Astron Chowk', 'Kotecha Chowk', 'Mavdi'],
      'Rajkot Rural': ['Gondal', 'Jetpur', 'Dhoraji', 'Upleta', 'Morbi'],
    },
    'Junagadh': {
      'Junagadh City': ['Motibagh', 'Zanzarda Road', 'Gir Gadhada'],
      'Junagadh Rural': ['Visavadar', 'Bhesan', 'Mendi', 'Sutrapada', 'Talala'],
    },
  },
  'Rajasthan': {
    'Jaipur': {
      'Jaipur City': ['MI Road', 'C Scheme', 'Bapu Nagar', 'Sanganer', 'Vaishali'],
      'Jaipur Rural': ['Chomu', 'Phagi', 'Sambhar', 'Phulera', 'Chaksu'],
    },
    'Jodhpur': {
      'Jodhpur City': ['Sardarpura', 'Ratanada', 'Pal Road', 'Shastri Nagar'],
      'Jodhpur Rural': ['Osian', 'Phalodi', 'Bilara', 'Pipar City', 'Shergarh'],
    },
    'Udaipur': {
      'Udaipur City': ['Lake City', 'Fatehsagar', 'Surjydevi', 'Goverdhan Vilas'],
      'Udaipur Rural': ['Girwa', 'Mavli', 'Salumber', 'Sarada', 'Kherwara'],
    },
    'Kota': {
      'Kota City': ['Rangbari', 'Talwandi', 'Sawan Navdurga', 'Kota Industrial Area'],
      'Kota Rural': ['Ladpura', 'Digod', 'Ramganj Mandi', 'Sangod', 'Pipalda'],
    },
  },
  'Uttar Pradesh': {
    'Lucknow': {
      'Lucknow City': ['Hazratganj', 'Aminabad', 'Alambagh', 'Indiranagar', 'Gomtinagar'],
      'Lucknow Rural': ['Bakshi Ka Talab', 'Malihabad', 'Mohanlalganj', 'Chinhat'],
    },
    'Varanasi': {
      'Varanasi City': ['Godowlia', 'Lahartara', 'Nati Imli', 'Cantt', 'Sigra'],
      'Varanasi Rural': ['Raja Talab', 'Chirai Bazar', 'Kashi', 'Varun Parik'],
    },
    'Agra': {
      'Agra City': ['Sanjjay Place', 'Civil Lines', 'Trans Yamuna', 'Kamla Nagar'],
      'Agra Rural': ['Fatehabad', 'Kiraoli', 'Kheragarh', 'Shamshabad'],
    },
    'Allahabad': {
      'Allahabad City': ['Civil Lines', 'Civility', 'Kamla Nehru Hospital', 'Lowther Road'],
      'Allahabad Rural': ['Phaphamau', 'Soraon', 'Meja', 'Karchhana'],
    },
    'Kanpur': {
      'Kanpur City': ['Swaroop Nagar', 'Kalyanpur', 'Gang Township', 'Chakeri'],
      'Kanpur Rural': ['Bilhaur', 'Bithur', 'Derapur', 'Ghatampur'],
    },
  },
  'Madhya Pradesh': {
    'Bhopal': {
      'Bhopal City': ['MP Nagar', 'Arera Colony', 'Kolar Road', 'BHEL', 'Habib Ganj'],
      'Bhopal Rural': ['Huzur', 'Phanda', 'Berasia', 'Baired'],
    },
    'Indore': {
      'Indore City': ['MG Road', 'Palasia', 'Vijay Nagar', 'Bicholi', 'Rau'],
      'Indore Rural': ['Mhow', 'Depalpur', 'Sanwer', 'Bagli'],
    },
    'Gwalior': {
      'Gwalior City': ['Lashkar', 'Morar', 'Nai Basti', 'Racotta'],
      'Gwalior Rural': ['Morar', 'Dabra', 'Bhitarwar', 'Morni'],
    },
    'Jabalpur': {
      'Jabalpur City': ['Napier Town', 'Wright Town', 'Sadar', 'GCF'],
      'Jabalpur Rural': ['Patan', 'Sihora', 'Kundam', 'Gwara'],
    },
  },
  'Punjab': {
    'Ludhiana': {
      'Ludhiana City': ['Clock Tower', 'Chaura Bazar', 'Gill Road', 'Sarabha Nagar'],
      'Ludhiana Rural': ['Jagraon', 'Samrala', 'Khanna', 'Mundian Kalan'],
    },
    'Amritsar': {
      'Amritsar City': ['Hall Bazar', 'Golden Temple Road', 'Ranjit Avenue', 'City Centre'],
      'Amritsar Rural': ['Ajnala', 'Harsha Chhina', 'Mishra Khurd', 'Chogawan'],
    },
    'Jalandhar': {
      'Jalandhar City': ['Civil Lines', 'Model Town', 'Guru Nanak Nagar', 'Suranwasi'],
      'Jalandhar Rural': ['Nakodar', 'Phillaur', 'Shahkot', 'Kartarpur'],
    },
  },
  'Andhra Pradesh': {
    'Visakhapatnam': {
      'Visakhapatnam City': ['MVP Colony', 'Dwaraka Nagar', 'Gajuwaka', 'Pendurthi'],
      'Visakhapatnam Rural': ['Anakapalli', 'Narsipatnam', 'Chodavaram', 'Kottavalasa'],
    },
    'Vijayawada': {
      'Vijayawada City': ['Benz Circle', 'MG Road', 'Opp Queens College', 'Penny'],
      'Vijayawada Rural': ['Guntur', 'Tadepalli', 'Mangalagiri', 'Krishna'],
    },
    'Hyderabad': {
      'Hyderabad City': ['Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Madhapur', 'Secunderabad'],
      'Hyderabad Rural': ['Ranga Reddy', 'Medak', 'Medchal', 'Municipal'],
    },
    'Tirupati': {
      'Tirupati Urban': ['Gair', 'Balaji Colony', 'STV Nagar', 'Tiruchanur'],
      'Tirupati Rural': ['Chandragiri', 'Srikalahasti', 'Puttur', 'Narayanavanam'],
    },
  },
  'Telangana': {
    'Hyderabad': {
      'Hyderabad': ['Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Madhapur', 'Secunderabad', 'Charminar'],
    },
    'Warangal': {
      'Warangal Urban': ['Kashibuggu', 'Hanamkonda', 'Warangal Fort'],
      'Warangal Rural': ['Siddipet', 'Jangaon', 'Karimnagar Rural'],
    },
  },
  'Kerala': {
    'Thiruvananthapuram': {
      'TVM City': ['Palayam', 'Kowdiar', 'Kazhakkoottam', 'Vellayambalam', 'Neyyattinkara'],
      'TVM Rural': ['Attingal', 'Varkala', 'Kollam Rural', 'Nedumangad'],
    },
    'Kochi': {
      'Kochi City': ['MG Road', 'Palarivattom', 'Edapally', 'Kalamassery', 'Vypeen'],
      'Ernakulam Rural': ['Angamaly', 'Aluva', 'Muvattupuzha', 'Kothamangalam'],
    },
    'Kozhikode': {
      'Kozhikode City': ['Mavoor Road', 'Beach Road', 'Chandar', 'Balakrishnan'],
      'Kozhikode Rural': ['Kunnamangalam', 'Koyilandy', 'Vatakara', 'Thamarassery'],
    },
  },
  'Bihar': {
    'Patna': {
      'Patna City': ['Boring Road', 'Kankarbagh', 'Mithapur', 'Digha', 'Patna City'],
      'Patna Rural': ['Bihta', 'Barh', 'Masaurhi', 'Fatuha'],
    },
    'Muzaffarpur': {
      'Muzaffarpur City': ['Corporate', 'Juranpura', 'Telia Bagh', 'Akharpur'],
      'Muzaffarpur Rural': ['Kalyanpur', 'Minapur', 'Saraiya', 'Musaipur'],
    },
    'Gaya': {
      'Gaya City': ['Gaya Station Road', 'Sanjay Nagar', 'Nawada'],
      'Gaya Rural': ['Bodh Gaya', 'Fatehpur', 'Paraiya', 'Belaganj'],
    },
  },
  'Odisha': {
    'Bhubaneswar': {
      'Bhubaneswar City': ['Unit 1', 'Unit 3', 'Unit 9', 'Sahid Nagar', 'Nayapalli'],
      'Bhubaneswar Rural': ['Cuttack Rural', 'Khordha', 'Jatni', 'Balugaon'],
    },
    'Cuttack': {
      'Cuttack City': ['College Road', 'Old Town', 'Choudhary Bazar', 'Bidyadharpur'],
      'Cuttack Rural': ['Salipur', 'Nischintakoili', 'Kisan', 'Niali'],
    },
    'Rourkela': {
      'Rourkela Steel City': ['Steel Township', 'Bisra', 'Bondamunda', 'Panposh'],
      'Sundargarh Rural': ['Sundergarh', 'Sagra', 'Bonai', 'Bonaigarh'],
    },
  },
  'Chhattisgarh': {
    'Raipur': {
      'Raipur City': ['Pandri', 'Shankar Nagar', 'Mowa', 'Rajendra Nagar'],
      'Raipur Rural': ['Abhanpur', 'Mandir', 'Gariaband', 'Tilda'],
    },
    'Bhilai': {
      'Bhilai Steel City': ['Sector 1-10', 'H-zone', 'Supela', 'Mau'],
      'Durg Rural': ['Dhamdha', 'Patan', 'Gunderdehi', 'Bemetara'],
    },
    'Bilaspur': {
      'Bilaspur City': ['Vyapar Vihar', 'Tagore Hill', 'Masturi Road'],
      'Bilaspur Rural': ['Mungeli', 'Lormi', 'Kota', 'Pendra'],
    },
  },
  'Jharkhand': {
    'Ranchi': {
      'Ranchi City': ['Hinoo', 'Kanke Road', 'Doranda', 'Main Road'],
      'Ranchi Rural': ['Bero', 'Mandar', 'Katu', 'Rania'],
    },
    'Jamshedpur': {
      'Jamshedpur': ['Bistupur', 'Sakchi', 'Tatanagar', 'Adityapur', 'Jugsalai'],
      'East Singhbhum Rural': ['Chakulia', 'Baharadila', 'Musabani', 'Dhalbhumgarh'],
    },
  },
  'Assam': {
    'Kamrup Metro': {
      'Guwahati': ['Pan Bazaar', 'Beltola', 'ZehnABI', 'RGVR', 'Dispur'],
      'Guwahati Rural': ['Chandrapur', 'Amingaon', 'Mirza', 'Hajo'],
    },
    'Dibrugarh': {
      'Dibrugarh City': ['Mann Field', 'Nawabpur', 'Sastriya'],
      'Dibrugarh Rural': ['Naharkatia', 'Duliajan', 'Moran', 'Tinsukia'],
    },
    'Silchar': {
      'Cachar': ['Silchar', 'Lakhipur', 'Sonai', 'Harina', 'Katigora'],
    },
  },
  'Puducherry': {
    'Puducherry': {
      'Puducherry': ['Rue De La Marine', 'Muthialpet', 'Orleanpet', 'Lawspet', 'Reddiarpalayam'],
    },
  },
  'Chandigarh': {
    'Chandigarh': {
      'Sector 1-30': ['Sector 17', 'Sector 22', 'Sector 35', 'Sector 43', 'Mani Majra'],
    },
  },
}

function LocationSelect({ formData, setFormData, errors }) {
  const states = Object.keys(locationData)
  const districts = formData.state ? Object.keys(locationData[formData.state] || {}) : []
  const talukas = formData.state && formData.district ? Object.keys(locationData[formData.state]?.[formData.district] || {}) : []
  const villages = formData.state && formData.district && formData.taluka 
    ? locationData[formData.state]?.[formData.district]?.[formData.taluka] || []
    : []

  const handleChange = (field, value) => {
    const resets = {
      state: { district: '', taluka: '' },
      district: { taluka: '', village: '' },
      taluka: { village: '' },
    }

    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...resets[field],
    }))
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] sm:text-[10.5px] tracking-[0.15em] sm:tracking-[0.22em] uppercase text-ink-2">State *</span>
        <select 
          name="state"
          value={formData.state}
          onChange={(e) => handleChange('state', e.target.value)}
          className={`bg-paper border-2 ${errors.state ? 'border-blood' : 'border-ink'} px-3 py-2.5 sm:px-3.5 sm:py-3 font-sans text-sm sm:text-[15px] text-ink outline-none transition-all`}
        >
          <option value="">Select State</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {errors.state && <span className="text-blood text-xs">{errors.state}</span>}
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] sm:text-[10.5px] tracking-[0.15em] sm:tracking-[0.22em] uppercase text-ink-2">District *</span>
        <select 
          name="district"
          value={formData.district}
          onChange={(e) => handleChange('district', e.target.value)}
          disabled={!formData.state}
          className={`bg-paper border-2 ${errors.district ? 'border-blood' : 'border-ink'} px-3 py-2.5 sm:px-3.5 sm:py-3 font-sans text-sm sm:text-[15px] text-ink outline-none transition-all disabled:opacity-50`}
        >
          <option value="">Select District</option>
          {districts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
        {errors.district && <span className="text-blood text-xs">{errors.district}</span>}
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] sm:text-[10.5px] tracking-[0.15em] sm:tracking-[0.22em] uppercase text-ink-2">Taluka</span>
        <select 
          name="taluka"
          value={formData.taluka}
          onChange={(e) => handleChange('taluka', e.target.value)}
          disabled={!formData.district}
          className="bg-paper border-2 border-ink px-3 py-2.5 sm:px-3.5 sm:py-3 font-sans text-sm sm:text-[15px] text-ink outline-none transition-all disabled:opacity-50"
        >
          <option value="">Select Taluka</option>
          {talukas.map(taluka => (
            <option key={taluka} value={taluka}>{taluka}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] sm:text-[10.5px] tracking-[0.15em] sm:tracking-[0.22em] uppercase text-ink-2">Village</span>
        <select 
          name="village"
          value={formData.village}
          onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
          disabled={!formData.taluka}
          className="bg-paper border-2 border-ink px-3 py-2.5 sm:px-3.5 sm:py-3 font-sans text-sm sm:text-[15px] text-ink outline-none transition-all disabled:opacity-50"
        >
          <option value="">Select Village</option>
          {villages.map(village => (
            <option key={village} value={village}>{village}</option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default LocationSelect