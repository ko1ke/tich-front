---
to: "<%= ['component', 'both'].includes(files_required) ? `src/components/${atomic}/${h.changeCase.pascal(component_name)}.tsx` : null %>"
---

import React from 'react';

type Props = {

}

const <%= h.changeCase.pascal(component_name) %>: React.FC<Props> = ({}) => {
  return (
    <></>
  )
}

export default <%= h.changeCase.pascal(component_name) %>;
