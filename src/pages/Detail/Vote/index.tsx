import React, { useEffect } from 'react';
import FormSearchTag from 'components/Form/FormSearchTag';
import Tag, { TagType } from 'components/Tag';
import Button from 'components/Button';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ActivityTagDataType } from 'types/ActivityDataType';
import { motion } from 'framer-motion';
import {
  ActionFunction, useFetcher, useNavigation, useRouteLoaderData, useSubmit,
} from 'react-router-dom';
import { DetailLoaderType } from 'types/Loader';
import { getTagUnvote, getTagVote } from 'api/user';
import getCookie from 'utils/getCookies';
import Popup from './Popup';
import './index.scss';

export const votedAction : ActionFunction = async ({ params }) => {
  const { activityId, tagId } = params;
  if (!activityId || !tagId) {
    throw new Response('請提供活動ID與標籤ID!', { status: 400 });
  }

  await getTagVote(
    activityId,
    tagId,
    getCookie('sessionToken'),
  );
  return new Response('', {
    status: 302,
    headers: {
      Location: `/detail/${activityId}/vote`,
    },
  });
};
export const unvotedAction: ActionFunction = async ({ params }) => {
  const { activityId, tagId } = params;
  if (!activityId || !tagId) {
    throw new Response('請提供活動ID與標籤ID!', { status: 400 });
  }

  await getTagUnvote(
    activityId,
    tagId,
    getCookie('sessionToken'),
  );
  return new Response('', {
    status: 302,
    headers: {
      Location: `/detail/${activityId}/vote`,
    },
  });
};

function Vote() {
  const detailLoaderData = useRouteLoaderData('detail') as DetailLoaderType;
  const { id: activityId, tags } = detailLoaderData.activityData;
  const navigate = useNavigation();

  const fetcher = useFetcher();
  const submit = useSubmit();

  const handleVotedButtonClick = (clickedTag: ActivityTagDataType) => {
    if (tags) {
      if (clickedTag.userVoted) {
        submit(
          null,
          {
            method: 'post',
            action: `/detail/${activityId}/vote/unvoted/${clickedTag.id}`,
          },
        );
      } else {
        submit(
          null,
          {
            method: 'post',
            action: `/detail/${activityId}/vote/voted/${clickedTag.id}`,
          },
        );
      }
    }
  };

  useEffect(() => {
    console.log(navigate.state);
  }, [navigate.state]);

  const handleSuggestionClick = (clickedTag: TagType) => {
    if (tags) {
      const foundTag = tags.find((tag) => tag.id.toString() === clickedTag.id);

      if (foundTag) {
        // TagCount increase and decrease
        if (!foundTag.userVoted) {
          submit(
            null,
            {
              method: 'post',
              action: `/detail/${activityId}/vote/voted/${clickedTag.id}`,
            },
          );
        } else {
          // TODO: custom alert
          alert('已投票!');
        }
      } else {
        submit(
          null,
          {
            method: 'post',
            action: `/detail/${activityId}/vote/voted/${clickedTag.id}`,
          },
        );
      }
    } else {
      submit(
        null,
        {
          method: 'post',
          action: `/detail/${activityId}/vote/voted/${clickedTag.id}`,
        },
      );
    }
  };

  const getVoteButton = (userVoted: boolean) => {
    if (navigate.state === 'loading' || navigate.state === 'submitting') {
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ ease: 'linear', duration: 0.5, repeat: Infinity }}
        >
          <AiOutlineLoading3Quarters />

        </motion.div>
      );
    }
    if (userVoted) {
      return <AiOutlineMinus />;
    }
    return <AiOutlinePlus />;
  };

  return (
    <Popup
      backLink={`/detail/${activityId}`}
    >
      <div className="vote">
        <FormSearchTag
          placeholder="搜尋標籤"
          onSuggestionClick={handleSuggestionClick}
        />
        <h3>目前標籤票數排行</h3>
        {tags && tags.map((tag: ActivityTagDataType) => {
          const variant = tag.type as TagType['type'];
          return (
            <div className="vote__item" key={`vote-pael-item-${tag.id.toString()}`}>
              <Tag
                id={`vote__tag-${tag.id.toString()}`}
                key={`vote__tag-${tag.id.toString()}`}
                text={tag.text}
                type={variant}
              />
              <p>
                票數:
                {tag.tagVoteCount}
              </p>

              <fetcher.Form>
                <Button
                  key={`vote__btn-${tag.id.toString()}`}
                  iconAfter={getVoteButton(tag.userVoted)}
                  color="dark"
                  type="button"
                  variant={{ outline: !tag.userVoted }}
                  onClick={() => handleVotedButtonClick(tag)}
                />
              </fetcher.Form>
            </div>
          );
        })}
      </div>
    </Popup>
  );
}

export default Vote;
