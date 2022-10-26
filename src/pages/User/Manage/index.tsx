import React from 'react';
import { BiBorderAll } from 'react-icons/bi';
import { BsBookmarkHeart } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { CardColumn, CardType } from '../../../components/Card';
import ManageNav from './components/ManageNav';
import dummyActivity from './dummy.json';
import ManageCardControl from './components/ManageCardControl';
import './index.scss';

function Manage() {
  const changeFilterHandler = (id: number) => {
    console.log(id);
  };

  return (
    <>
      <h1>This is Manage Page</h1>
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
          return (
            <div className="manage-main__card">
              <CardColumn
                data={{
                  imgUrl, title, altText, tags,
                } as CardType}
                control={(
                  <ManageCardControl
                    beginTime={new Date(date_start)}
                    dueTime={new Date(apply_end)}
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
