import { skills } from '../../utils/constants';
import './Skills.css';

const Skills = () => {
  return (
    <section id="technical" className="skills-section">
      <div className="container">
        <h2>Technical Skills & Tools</h2>
        
        <div className="ui-skills">
          {skills.map((skill, index) => (
            <a 
              href="#skills" 
              key={index} 
              title={skill.name}
              className="skill-wrapper"
            >
              <div 
                className="skill-badge" 
                style={{ 
                  borderColor: skill.color,
                  /* Hover'da parlamayı desteklemek için inline style dokunuşu */
                  '--skill-hover-color': skill.color 
                }}
              >
                {skill.name}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;