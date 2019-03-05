package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterDemoApp;

import io.github.jhipster.application.domain.Students;
import io.github.jhipster.application.repository.StudentsRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StudentsResource REST controller.
 *
 * @see StudentsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterDemoApp.class)
public class StudentsResourceIntTest {

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    @Autowired
    private StudentsRepository studentsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restStudentsMockMvc;

    private Students students;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StudentsResource studentsResource = new StudentsResource(studentsRepository);
        this.restStudentsMockMvc = MockMvcBuilders.standaloneSetup(studentsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Students createEntity(EntityManager em) {
        Students students = new Students()
            .prenom(DEFAULT_PRENOM)
            .nom(DEFAULT_NOM)
            .age(DEFAULT_AGE);
        return students;
    }

    @Before
    public void initTest() {
        students = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudents() throws Exception {
        int databaseSizeBeforeCreate = studentsRepository.findAll().size();

        // Create the Students
        restStudentsMockMvc.perform(post("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(students)))
            .andExpect(status().isCreated());

        // Validate the Students in the database
        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeCreate + 1);
        Students testStudents = studentsList.get(studentsList.size() - 1);
        assertThat(testStudents.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testStudents.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testStudents.getAge()).isEqualTo(DEFAULT_AGE);
    }

    @Test
    @Transactional
    public void createStudentsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studentsRepository.findAll().size();

        // Create the Students with an existing ID
        students.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentsMockMvc.perform(post("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(students)))
            .andExpect(status().isBadRequest());

        // Validate the Students in the database
        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStudents() throws Exception {
        // Initialize the database
        studentsRepository.saveAndFlush(students);

        // Get all the studentsList
        restStudentsMockMvc.perform(get("/api/students?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(students.getId().intValue())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)));
    }
    
    @Test
    @Transactional
    public void getStudents() throws Exception {
        // Initialize the database
        studentsRepository.saveAndFlush(students);

        // Get the students
        restStudentsMockMvc.perform(get("/api/students/{id}", students.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(students.getId().intValue()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE));
    }

    @Test
    @Transactional
    public void getNonExistingStudents() throws Exception {
        // Get the students
        restStudentsMockMvc.perform(get("/api/students/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudents() throws Exception {
        // Initialize the database
        studentsRepository.saveAndFlush(students);

        int databaseSizeBeforeUpdate = studentsRepository.findAll().size();

        // Update the students
        Students updatedStudents = studentsRepository.findById(students.getId()).get();
        // Disconnect from session so that the updates on updatedStudents are not directly saved in db
        em.detach(updatedStudents);
        updatedStudents
            .prenom(UPDATED_PRENOM)
            .nom(UPDATED_NOM)
            .age(UPDATED_AGE);

        restStudentsMockMvc.perform(put("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStudents)))
            .andExpect(status().isOk());

        // Validate the Students in the database
        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeUpdate);
        Students testStudents = studentsList.get(studentsList.size() - 1);
        assertThat(testStudents.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testStudents.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testStudents.getAge()).isEqualTo(UPDATED_AGE);
    }

    @Test
    @Transactional
    public void updateNonExistingStudents() throws Exception {
        int databaseSizeBeforeUpdate = studentsRepository.findAll().size();

        // Create the Students

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentsMockMvc.perform(put("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(students)))
            .andExpect(status().isBadRequest());

        // Validate the Students in the database
        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStudents() throws Exception {
        // Initialize the database
        studentsRepository.saveAndFlush(students);

        int databaseSizeBeforeDelete = studentsRepository.findAll().size();

        // Delete the students
        restStudentsMockMvc.perform(delete("/api/students/{id}", students.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Students.class);
        Students students1 = new Students();
        students1.setId(1L);
        Students students2 = new Students();
        students2.setId(students1.getId());
        assertThat(students1).isEqualTo(students2);
        students2.setId(2L);
        assertThat(students1).isNotEqualTo(students2);
        students1.setId(null);
        assertThat(students1).isNotEqualTo(students2);
    }
}
