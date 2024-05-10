const otpVerification = async (otpTime) => {
    try {
        console.log("otpTime:", otpTime);

        const currentDateTime = new Date();
        const differenceMs = Math.abs(otpTime - currentDateTime);
        const differenceMinutes = Math.ceil(differenceMs / (1000 * 60));

        console.log("Difference in minutes:", differenceMinutes);

        return differenceMinutes > 2;
    } catch (error) {
        console.log("Error in otpVerification:", error);
        return false;
    }
};

module.exports = {
    otpVerification,
};





module.exports={
    otpVerification,
};
