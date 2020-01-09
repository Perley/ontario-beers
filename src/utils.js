export function filterData(text, data, props) {
  const andText = text.split('&');
  const orText = text.split('|');

  let filtered = [];
  
  if (andText.length > 1) {
    // AND takes precedence
    filtered = andText.reduce((acc, term) => {
        if (term.includes('|')) {
          return filterData(term, acc, props);
        } else {
          return acc.filter(beer => 
            props.find(key => {
              const prop = beer[key];

              if(typeof prop === 'string') {
                return prop.toLowerCase().includes(term.toLowerCase().trim());
              }

              return false;
            })
          );
        }

      },
      data
    );
  } else if (orText.length > 1) {
    let nextFiltered = [];

    // Get all data sets that include each term
    nextFiltered = orText.flatMap((term) => 
      data.filter(beer => 
        props.find(key => {
          const prop = beer[key];

          if(typeof prop === 'string') {
            return prop.toLowerCase().includes(term.toLowerCase().trim());
          }

          return false;
        })
      )
    );

    // Remove duplicate entries
    filtered = nextFiltered.reduce((acc, item) => {
        const idx = acc.findIndex(i => i.beer_id === item.beer_id);

        if (idx === -1) {
          return [...acc, item];
        } else {
          return acc;
        }
      },
      [],
    );
  } else {
    filtered = data.filter(beer => 
      props.find(key => {
        const prop = beer[key];

        if(typeof prop === 'string') {
          return prop.toLowerCase().includes(text.toLowerCase().trim());
        }

        return false;
      })
    );
  }

  return filtered;
}