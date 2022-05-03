<template>
    <BaseModal 
    id="addSectionModal" 
    :title="title" 
    :saveMethod="save" 
    :wait_for_validation="cancel_save" 
    :info="info" :form_modal="form_modal" 
    :cancelMethod="cancel"
    
    >
        <div class="form-group">
            <label for="section_name" >
                Nombre de la sección
            </label>

            <input v-model="section_name" 
            type="text" name="section_name" id="section_name_ipt" class="form-control" required>


            <label for="section_desc" >
                Descripción de la sección
            </label>
            <textarea v-model="section_desc" 
            name="section_desc" id="section_desc_ipt" 
            class="form-control" style="resize: none;" required>
            </textarea>


            <label for="section_video" >
                Url  del video
            </label>

            <input v-model="section_video" 
            type="text" name="section_video" id="section_video_ipt" class="form-control" required>

           

            <div v-if="inputErrors">
                <div v-for="_error in inputErrors" :key="_error">
                    <span>
                        * {{_error}}
                    </span>
                    <br>
                </div>
            </div>
            
            

        </div>
        

    </BaseModal>
    
</template>

<script>
import SectionService from '../../../services/section.service';
import $ from  'jquery/dist/jquery';
import Swal from 'sweetalert2';

export default {
    name: "AddSection",
    emits : [
        'making_action',
    ],
    props : {
        reload : Function,
        course_id : Number,
    },
    data() {
        return {
            title : "Añadir sección",
            cancel_save:true,
            info:false,
            form_modal:true,
            section_name: "",
            section_desc: "",
            section_video : "",
            section_position : 1,
            inputErrors : [],
        }
    },
    methods: {
        
        validations(){
            this.inputErrors = []
            if(this.section_name.trim().length < 1){
                this.inputErrors.push("Longitud debe ser mayor a 0")
            }
            if(this.section_desc.trim().length < 10){
                this.inputErrors.push("Descripción debe tener al menos 10 caracteres.")
            }
            if(this.section_video.trim().length < 1){
                this.inputErrors.push('La url del video debe ser mayor a 0 caracteres.')
            }
            if (this.inputErrors.length){
                return false
            }
            return true;
        },
        save(){
            
            let formOk = this.validations();
            
            if(formOk === true){
                this.$emit('making_action',true)
                $("#addSectionModal").modal("hide");
                SectionService.add(this.course_id,this.section_name,this.section_desc,this.section_video).then(
                (response) => {
                    this.clear();
                    this.$emit('making_action',false)
                    Swal.fire({
                        title: 'Tarea completada.',
                        text:   "Se ha añadio de forma correcta la sección",
                        icon: 'success',
                        confirmButtonText : 'Ok',
                        allowOutsideClick: false
                    }).then(
                        (response)=>{
                            console.log(response);
                            this.$emit('making_action',true)
                            this.reload();
                            this.$emit('making_action',false)

                        }
                    )
                }
                ).catch(
                    (err) => {
                        alert(err.message);
                        this.$emit('making_action',false)
                    }
                )
            }
        },
        cancel(){
            this.clear();
        },
        clear(){
            this.section_name = "";
            this.section_desc ="";
            this.section_video = "";
            this.inputErrors = []
        }
    }
}

</script>