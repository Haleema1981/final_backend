require('dotenv').config();
const mongoose=require('mongoose');
const Project=require('./models/Project');
const sample=[
 {title:'Responsible and Human-Centred Adoption of Generative AI among University Teachers in Higher Education',description:'A research project examining responsible, human-centred adoption of generative AI among university teachers, including AI literacy, pedagogical practices and academic work.',researchArea:'Artificial Intelligence in Education',studentName:'Dr. Haleema Bibi',supervisorName:'Research Supervisor',status:'Proposed',deadline:'2027-06-30'},
 {title:'Faculty Performance under Tenure Track and Basic Pay Scale Systems',description:'A comparative higher education study examining faculty performance under different academic employment and policy structures.',researchArea:'Higher Education Policy',studentName:'Dr. Haleema Bibi',supervisorName:'Higher Education Supervisor',status:'In Progress',deadline:'2027-04-30'},
 {title:'Undergraduate Students’ Awareness of Generative AI in Higher Education',description:'A cross-sectional study of undergraduate students’ awareness and perceived academic benefits of generative AI tools in Pakistani higher education institutions.',researchArea:'Educational Technology',studentName:'Research Student',supervisorName:'Education Supervisor',status:'Approved',deadline:'2027-08-31'}
];
(async()=>{try{await mongoose.connect(process.env.MONGO_URI);await Project.deleteMany({});await Project.insertMany(sample);console.log('Sample projects inserted.');await mongoose.disconnect()}catch(e){console.error(e);process.exit(1)}})();
