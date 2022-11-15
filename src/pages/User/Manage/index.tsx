import React from 'react';
import { BiBorderAll } from 'react-icons/bi';
import { BsBookmarkHeart } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import ManageNav from 'components/ManageNav';
import { CardColumn, CardType } from '../../../components/Card';
import dummyActivity from './dummy.json';
import ManageCardControl from './components/ManageCardControl';
import './index.scss';

function Manage() {
  const changeFilterHandler = (id: number) => {
    // eslint-disable-next-line no-console
    console.log(id);
  };

  return (
    <>
      <ManageNav
        // onClick={clickHandler}
        buttons={
          [
            {
              title: '全部',
              icon: <BiBorderAll />,
            },
            {
              title: '已報名',
              icon: <AiOutlineCheckCircle />,
            },
            {
              title: '願望',
              icon: <BsBookmarkHeart />,
            },
          ]
        }
        onChangeFilter={changeFilterHandler}
      />
      <div className="manage-main">
        {dummyActivity.activities.map((activity) => {
          const {
            image_url: imgUrl, title, image_alt: altText, tags, date_start, apply_end,
          } = activity;

          const firstImgUrl = imgUrl?.[0];
          return (
            <div className="manage-main__card">
              <CardColumn
                data={{
                  imgUrl: firstImgUrl, title, altText, tags,
                } as CardType}
                control={(

                  <ManageCardControl
                    beginDate={date_start}
                    dueDate={apply_end}
                  />

                )}
              />
            </div>
          );
        })}
      </div>

    </>
  );
}

export default Manage;
