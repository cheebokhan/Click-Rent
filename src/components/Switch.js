
import {withStyles,Switch} from "@material-ui/core"
export default withStyles((theme) => ({
    root: {
        width: 62,
        height: 26,
        padding: 0,
        margin: theme.spacing(3),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(38px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#00a152',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.error.dark,
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});
