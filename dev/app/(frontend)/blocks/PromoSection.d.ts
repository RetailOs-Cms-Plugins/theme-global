import React from 'react';
interface PromoSectionProps {
    buttonText?: string;
    mainImage?: string;
    mainTitle?: string;
    onButtonClick?: () => void;
    promotionText?: string;
    secondaryTitle?: string;
    smallImage?: string;
}
declare const PromoSection: React.FC<PromoSectionProps>;
export default PromoSection;
