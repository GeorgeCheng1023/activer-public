import Button from 'components/Button';
import Tag from 'components/Tag';
import React from 'react';
import { BiSend } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import './index.scss';

function SearchHistory() {
  return (
    <div className="search-history">

      <div className="search-history__head">
        <div className="search-history__checkbox"><BsTrash /></div>
        <div className="search-history__keyword">關鍵字</div>
        <div className="search-history__tag">標籤</div>
        <div className="search-history__navigate">{' '}</div>
      </div>

      <div className="search-history__item">
        <div className="search-history__checkbox">
          <input id="test" type="checkbox" />
        </div>
        <div className="search-history__keyword">keyworsssssssssssssssssd</div>
        <div className="search-history__tag">
          {' '}
          <Tag text="test" type="area" id="1" />
          <Tag text="test" type="area" id="1" />
          <Tag text="test" type="area" id="1" />
          <Tag text="test" type="area" id="1" />
          <Tag text="test" type="area" id="1" />
          <Tag text="test" type="area" id="1" />

        </div>
        <div className="search-history__navigate">
          {' '}
          <Button
            iconBefore={<BiSend />}
            variant={{ round: true }}
            color="transparent"
          />

        </div>
      </div>
      <div className="search-history__item">
        <div className="search-history__checkbox">
          <input id="test" type="checkbox" />
        </div>
        <div className="search-history__keyword">keyword</div>
        <div className="search-history__tag">
          {' '}
          <Tag text="test" type="area" id="1" />
          <Tag text="test" type="area" id="1" />
          <Tag text="test" type="area" id="1" />
          <Tag text="test" type="area" id="1" />
          <Tag text="test" type="area" id="1" />
          <Tag text="test" type="area" id="1" />

        </div>
        <div className="search-history__navigate">
          {' '}
          <Button
            iconBefore={<BiSend />}
            variant={{ round: true }}
            color="white"
          />

        </div>
      </div>

    </div>
  );
}

export default SearchHistory;
