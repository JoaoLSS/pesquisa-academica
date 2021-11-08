import { keyframes } from '@material-ui/system';

const show = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px)
    }
    to {
        opacity: 1;
        transform: translateY(0px)
    }
`;

export const showAnimation = `${show} 0.5s 1 ease`;
