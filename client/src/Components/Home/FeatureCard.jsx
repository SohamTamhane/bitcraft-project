
function FeatureCard({logo, title, desc}){
    return(
        <div className="feature-card-main-div">
            <div>
                <div className="feature-icon-div">
                    {logo}
                </div>
                <div className="feature-card-header">
                    {title}
                </div>
                <div className="feature-card-desc">
                    {desc}
                </div>
            </div>
        </div>
    )
}

export default FeatureCard;