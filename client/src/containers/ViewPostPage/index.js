import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { actions } from 'actions/ui/viewPostPage';
import CommentsSection from './CommentsSection';
import BackToHomeButton from 'components/BackToHomeButton';
import LikeButton from 'components/LikeButton';
import UserAvatar from 'components/UserAvatar';
import {
  makePostTitleSelector,
  makePostBodySelector,
  makePostDateCreatedSelector,
  makePostAuthorIdSelector,
} from 'selectors/entities/posts';
import { makeUsernameSelector } from 'selectors/entities/users';
import styles from './styles';

const useStyles = makeStyles(styles);

const ViewPostPage = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { pid: id } = props.match.params;
  const postTitleSelector = useMemo(makePostTitleSelector, []);
  const postTitle = useSelector((state) => postTitleSelector(state, { id }));
  const postBodySelector = useMemo(makePostBodySelector, []);
  const postBody = useSelector((state) => postBodySelector(state, { id }));
  const postDateCreatedSelector = useMemo(makePostDateCreatedSelector, []);
  const postDateCreated = useSelector((state) =>
    postDateCreatedSelector(state, { id })
  );
  const postAuthorIdSelector = useMemo(makePostAuthorIdSelector, []);
  const postAuthorId = useSelector((state) =>
    postAuthorIdSelector(state, { id })
  );
  const postAuthorUsernameSelector = useMemo(makeUsernameSelector, []);
  const postAuthorUsername = useSelector((state) =>
    postAuthorUsernameSelector(state, { id: postAuthorId })
  );

  useEffect(() => {
    dispatch(actions.invokeFetchPostAndAuthor(id));
  }, [dispatch, id]);

  return (
    <div className={classes.root}>
      <Grid container alignItems='center' spacing={2}>
        <Grid item>
          <UserAvatar id={postAuthorId} />
        </Grid>
        <Grid item>
          <Typography variant='h4' className={classes.title}>
            {postTitle}
          </Typography>
        </Grid>
      </Grid>
      <Typography
        variant='body2'
        color='textSecondary'
      >{`By: ${postAuthorUsername}`}</Typography>
      <Typography
        variant='body2'
        color='textSecondary'
      >{`Written: ${postDateCreated}`}</Typography>
      <Typography>{postBody}</Typography>
      <span className={classes.backButtonContainer}>
        <BackToHomeButton />
      </span>
      <LikeButton postId={id} />
      <Divider className={classes.divider} />
      <CommentsSection postId={id} />
    </div>
  );
};

export default ViewPostPage;
