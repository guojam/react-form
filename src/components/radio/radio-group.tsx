import React, { cloneElement } from 'react';

import styles from './radio.module.scss';
import Radio from './radio';
import { RadioGroupProps } from './radio.model';

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
    const { name, onChange, options, value: checkedValue, children } = props;
    if (!(options && Array.isArray(options) && options.length) && !children) {
        return null;
    }

    return (
        <div className={styles.radioGroup}>
            {options
                ? options.map((option) => {
                      const { value, checked } = option;
                      const isChecked =
                          checked !== undefined
                              ? checked
                              : value === checkedValue;
                      return (
                          <Radio
                              key={value}
                              {...option}
                              name={name}
                              checked={isChecked}
                              onChange={onChange}
                          />
                      );
                  })
                : React.Children.map(children, (child) => {
                      if (child.type.displayName === 'Radio') {
                          const { value, checked } = child.props;
                          const isChecked =
                              checked !== undefined
                                  ? checked
                                  : value === checkedValue;
                          const childProps = {
                              name,
                              checked: isChecked,
                              onChange,
                          };
                          return cloneElement(child, childProps);
                      } else {
                          return child;
                      }
                  })}
        </div>
    );
};

export default RadioGroup;
