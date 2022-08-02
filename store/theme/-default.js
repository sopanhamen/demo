import { v4 as uuid } from 'uuid'

export const websiteLayout = {
  theme: 'default',
  color: 'default',
  font: 'nunito',
  roundSize: 'rounded-lg',
  navbar: {
    label: 'Default',
    name: 'NavbarDefault',
    props: {
      showLanguageSwitcher: true
    }
  },
  menu: {
    label: 'Default',
    name: 'MenuDefault',
    props: {
      showLanguageSwitcher: true
    }
  },
  footer: {
    label: 'Default',
    name: 'FooterDefault',
    props: {
      showSocialMedia: true
    }
  },
  pages: {
    home: {
      showPageHeader: true,
      showBreadcrumb: true,
      backgroundColor: 'transparent',
      classList: 'container mx-auto',
      sections: [
        {
          id: uuid(),
          props: {
            paddings: { top: '', bottom: '', left: '', right: '' },
            margins: { top: '', bottom: '', left: '', right: '' },
            backgroundColor: 'transparent',
            classList: ''
          },
          columns: [
            {
              id: uuid(),
              components: [],
              props: {
                paddings: { top: '', bottom: '', left: '', right: '' },
                margins: { top: '', bottom: '', left: '', right: '' }
              }
            }
          ]
        }
      ]
    },
    properties: {
      showPageHeader: true,
      showBreadcrumb: true,
      backgroundColor: 'transparent',
      classList: 'container mx-auto',
      sections: [
        {
          id: uuid(),
          props: {
            paddings: { top: '', bottom: '', left: '', right: '' },
            margins: { top: '', bottom: '', left: '', right: '' },
            backgroundColor: 'transparent',
            classList: ''
          },
          columns: [
            {
              id: uuid(),
              components: [],
              props: {
                paddings: { top: '', bottom: '', left: '', right: '' },
                margins: { top: '', bottom: '', left: '', right: '' }
              }
            }
          ]
        }
      ]
    },
    property: {
      showPageHeader: true,
      showBreadcrumb: true,
      backgroundColor: 'transparent',
      classList: 'container mx-auto',
      sections: [
        {
          id: uuid(),
          props: {
            paddings: { top: '', bottom: '', left: '', right: '' },
            margins: { top: '', bottom: '', left: '', right: '' },
            backgroundColor: 'transparent',
            classList: ''
          },
          columns: [
            {
              id: uuid(),
              components: [],
              props: {
                paddings: { top: '', bottom: '', left: '', right: '' },
                margins: { top: '', bottom: '', left: '', right: '' }
              }
            }
          ]
        }
      ]
    },
    maps: {
      showPageHeader: true,
      showBreadcrumb: true,
      backgroundColor: 'transparent',
      classList: 'container mx-auto',
      sections: [
        {
          id: uuid(),
          props: {
            paddings: { top: '', bottom: '', left: '', right: '' },
            margins: { top: '', bottom: '', left: '', right: '' },
            backgroundColor: 'transparent',
            classList: ''
          },
          columns: [
            {
              id: uuid(),
              components: [],
              props: {
                paddings: { top: '', bottom: '', left: '', right: '' },
                margins: { top: '', bottom: '', left: '', right: '' }
              }
            }
          ]
        }
      ]
    },
    agent: {
      showPageHeader: true,
      showBreadcrumb: true,
      backgroundColor: 'transparent',
      classList: 'container mx-auto',
      sections: [
        {
          id: uuid(),
          props: {
            paddings: { top: '', bottom: '', left: '', right: '' },
            margins: { top: '', bottom: '', left: '', right: '' },
            backgroundColor: 'transparent',
            classList: ''
          },
          columns: [
            {
              id: uuid(),
              components: [],
              props: {
                paddings: { top: '', bottom: '', left: '', right: '' },
                margins: { top: '', bottom: '', left: '', right: '' }
              }
            }
          ]
        }
      ]
    },
    company: {
      showPageHeader: true,
      showBreadcrumb: true,
      backgroundColor: 'transparent',
      classList: 'container mx-auto',
      sections: [
        {
          id: uuid(),
          props: {
            paddings: { top: '', bottom: '', left: '', right: '' },
            margins: { top: '', bottom: '', left: '', right: '' },
            backgroundColor: 'transparent',
            classList: ''
          },
          columns: [
            {
              id: uuid(),
              components: [],
              props: {
                paddings: { top: '', bottom: '', left: '', right: '' },
                margins: { top: '', bottom: '', left: '', right: '' }
              }
            }
          ]
        }
      ]
    },
    about: {
      showPageHeader: true,
      showBreadcrumb: true,
      backgroundColor: 'transparent',
      classList: 'container mx-auto',
      sections: [
        {
          id: uuid(),
          props: {
            paddings: { top: '', bottom: '', left: '', right: '' },
            margins: { top: '', bottom: '', left: '', right: '' },
            backgroundColor: 'transparent',
            classList: ''
          },
          columns: [
            {
              id: uuid(),
              components: [],
              props: {
                paddings: { top: '', bottom: '', left: '', right: '' },
                margins: { top: '', bottom: '', left: '', right: '' }
              }
            }
          ]
        }
      ]
    },
    contact: {
      showPageHeader: true,
      showBreadcrumb: true,
      backgroundColor: 'transparent',
      classList: 'container mx-auto',
      sections: [
        {
          id: uuid(),
          props: {
            paddings: { top: '', bottom: '', left: '', right: '' },
            margins: { top: '', bottom: '', left: '', right: '' },
            backgroundColor: 'transparent',
            classList: ''
          },
          columns: [
            {
              id: uuid(),
              components: [],
              props: {
                paddings: { top: '', bottom: '', left: '', right: '' },
                margins: { top: '', bottom: '', left: '', right: '' }
              }
            }
          ]
        }
      ]
    }
  }
}

export const components = [
  // Property
  {
    name: 'LazyPropertySearch',
    label: 'Search Property',
    props: {
      paddings: { top: 0, bottom: 0, left: 0, right: 0 },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      backgroundColor: '',
      backgroundImage: '',
      classList: ''
    }
  },
  {
    name: 'LazyPropertyAdvancedSearch',
    label: 'Advanced Search Property',
    props: {
      paddings: { top: 0, bottom: 0, left: 0, right: 0 },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      backgroundColor: '',
      backgroundImage: '',
      classList: '',
      style: {
        name: 'Default',
        label: 'Default'
      },
      availableStyles: [
        { name: 'Default', label: 'Default' },
        { name: 'Square', label: 'Square' },
        { name: 'SquareClassic', label: 'Square Classic' },
        { name: 'Minimal', label: 'Compact' },
        { name: 'Landscape', label: 'Landscape' }
      ],
      exclusive: { name: 'ExclusiveRibbon', label: 'Ribbon' },
      exclusiveStyles: [
        {
          name: 'ExclusiveRibbon',
          label: 'Ribbon'
        },
        {
          name: 'ExclusiveIcon',
          label: 'Icon'
        }
      ],
      sidebarStyle: 'left',
      gridStyle: 3
    }
  },
  {
    name: 'LazyFeaturedProperty',
    label: 'Featured Properties',
    props: {
      paddings: { top: 0, bottom: 0, left: 0, right: 0 },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      backgroundColor: '',
      backgroundImage: '',
      classList: ''
    }
  },
  {
    name: 'LazyPropertyList',
    label: 'Property List',
    props: {
      paddings: { top: 0, bottom: 0, left: 0, right: 0 },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      backgroundColor: '',
      backgroundImage: '',
      classList: '',
      style: { name: 'Default', label: 'Default' },
      availableStyles: [
        { name: 'Default', label: 'Default' },
        { name: 'Square', label: 'Square' },
        { name: 'SquareClassic', label: 'Square Classic' },
        { name: 'Minimal', label: 'Compact' },
        { name: 'Landscape', label: 'Landscape' }
      ],
      exclusive: { name: 'ExclusiveRibbon', label: 'Ribbon' },
      exclusiveStyles: [
        {
          name: 'ExclusiveRibbon',
          label: 'Ribbon'
        },
        {
          name: 'ExclusiveIcon',
          label: 'Icon'
        }
      ]
    }
  },
  {
    name: 'LazyPropertyCardCarousels',
    label: 'Property Card Carousels',
    props: {
      paddings: { top: 0, bottom: 0, left: 0, right: 0 },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      backgroundColor: '',
      backgroundImage: '',
      classList: '',
      style: {
        name: 'Default',
        label: 'Default'
      },
      availableStyles: [
        { name: 'Default', label: 'Default' },
        { name: 'Square', label: 'Square' },
        { name: 'SquareClassic', label: 'Square Classic' },
        { name: 'Minimal', label: 'Compact' },
        { name: 'Landscape', label: 'Landscape' }
      ],
      exclusive: { name: 'ExclusiveRibbon', label: 'Ribbon' },
      exclusiveStyles: [
        {
          name: 'ExclusiveRibbon',
          label: 'Ribbon'
        },
        {
          name: 'ExclusiveIcon',
          label: 'Icon'
        }
      ],
      gridStyle: 3,
      listingPurpose: 1
    }
  },
  {
    name: 'LazyPropertyMaps',
    label: 'Property Maps',
    props: {
      paddings: { top: 0, bottom: 0, left: 0, right: 0 },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      backgroundColor: '',
      backgroundImage: '',
      classList: ''
    }
  },
  {
    name: 'LazyPropertyDetail',
    label: 'Property Detail',
    props: {
      paddings: { top: 0, bottom: 0, left: 0, right: 0 },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      backgroundColor: '',
      backgroundImage: '',
      classList: '',
      style: {
        name: 'BigSlider',
        label: 'Big Slider'
      },
      availableStyles: [
        { name: 'Basic', label: 'Basic' },
        { name: 'BigSlider', label: 'Big Slider' },
        { name: 'Compact', label: 'Compact' },
        { name: 'MapView', label: 'Map View' }
      ]
    }
  },

  // Agent
  {
    name: 'LazyAgentList',
    label: 'Agent List',
    props: {
      paddings: { top: 0, bottom: 0, left: 0, right: 0 },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      backgroundColor: '',
      backgroundImage: '',
      classList: '',
      style: {
        name: 'AgentListDefault',
        label: 'Agent List Default'
      },
      availableStyles: [
        { name: 'AgentListDefault', label: 'Agent List Default' },
        { name: 'AgentListSquare', label: 'Agent List Square' }
      ]
    }
  },
  {
    name: 'LazyAgentSearch',
    label: 'Agent Search',
    props: {
      paddings: { top: 0, bottom: 0, left: 0, right: 0 },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      backgroundColor: '',
      backgroundImage: '',
      classList: ''
    }
  },
  {
    name: 'LazyAgentCarousel',
    label: 'Agent Carousel',
    props: {
      paddings: { top: 0, bottom: 0, left: 0, right: 0 },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      title: '',
      description: '',
      backgroundColor: '',
      backgroundImage: '',
      classList: '',
      style: {
        name: 'AgentCardItemDefault',
        label: 'Agent Carousel Default'
      },
      availableStyles: [
        { name: 'AgentCardItemDefault', label: 'Agent Carousel Default' },
        { name: 'AgentCardItemSquare', label: 'Agent Carousel Square' }
      ]
    }
  },

  // Company
  {
    name: 'LazyAboutService',
    label: 'About Service',
    props: {
      paddings: { top: 0, bottom: 0, left: 0, right: 0 },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      backgroundColor: '',
      backgroundImage: '',
      classList: ''
    }
  },
  {
    name: 'LazyCompanyDescription',
    label: 'Company Description',
    props: {
      paddings: { top: 0, bottom: 0, left: 0, right: 0 },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      imageUrl: '',
      description: '',
      backgroundColor: '',
      backgroundImage: '',
      classList: ''
    }
  },
  {
    name: 'LazyCompanyAboutVision',
    label: 'Company Vision & Mission',
    props: {
      paddings: { top: 0, bottom: 0, left: 0, right: 0 },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      backgroundColor: '',
      backgroundImage: '',
      classList: '',
      style: {
        name: 'CompanyAboutVisionDefault',
        label: 'Company About Vision Default'
      },
      availableStyles: [
        {
          name: 'CompanyAboutVisionDefault',
          label: 'Company About Vision Default'
        },
        {
          name: 'CompanyAboutVisionGrid',
          label: 'Company About Vision Grid'
        }
      ],
      imageUrl: '',
      vision: '',
      mission: '',
      coreValues: ''
    }
  },

  // Contact
  {
    name: 'LazyContactForm',
    label: 'Contact Form',
    props: {
      paddings: { top: 0, bottom: 0, left: 0, right: 0 },
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      backgroundColor: '',
      backgroundImage: '',
      classList: '',
      style: { name: 'Default', label: 'Default' },
      availableStyles: [
        { name: 'Default', label: 'Default' },
        { name: 'MapView', label: 'Map View' }
      ],
      description: '',
      openingHour: '',
      email1: '',
      email2: '',
      phone1: '',
      phone2: ''
    }
  },

  // Other
  {
    name: 'LazyBanner',
    label: 'Banner',
    props: {
      title: 'Banner',
      subTitle: 'Banner subtitle',
      backgroundColor: '',
      backgroundImage: '',
      classList: ''
    }
  },

  // Other
  {
    name: 'LazyTextContent',
    label: 'Text Content',
    props: {
      description: '',
      backgroundColor: '',
      backgroundImage: '',
      classList: ''
    }
  }
]
