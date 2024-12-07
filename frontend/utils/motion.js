export const textVariant = (delay) => ({
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 1.25,
        delay,
      },
    },
  });
  
 export const fadeInUpVariant = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'tween',
        duration: 0.9,
        ease: 'easeOut'
      }
    }
  };
  
  // export const textVariant2 = {
  //   hidden: {
  //     opacity: 0,
  //     y: 20,
  //   },
  //   show: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       type: 'tween',
  //       ease: 'easeIn',
  //     },
  //   },
  // };
  
  
  
  