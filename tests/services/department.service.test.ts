import { mock, MockProxy } from "jest-mock-extended";
import DepartmentRepository from "../../repositories/department.repository";
import DepartmentService from "../../services/department.service";
import Department from "../../entities/department.entity";
import HttpException from "../../exception/httpException";
import { when } from "jest-when";

describe("DepartmentService", () => {
  let departmentRepository: MockProxy<DepartmentRepository>;
  let departmentService: DepartmentService;

  beforeEach(() => {
    departmentRepository = mock<DepartmentRepository>();
    departmentService = new DepartmentService(departmentRepository);
  });

  describe("createDepartment", () => {
    it("should create a new department successfully", async () => {
      const departmentName = "Engineering";
      const createdDepartment = { id: 1, name: departmentName } as Department;

      when(departmentRepository.create)
        .calledWith(expect.objectContaining({ name: departmentName }))
        .mockResolvedValue(createdDepartment);

      const result = await departmentService.createDepartment(departmentName);

      expect(departmentRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ name: departmentName })
      );
      expect(result).toStrictEqual(createdDepartment);
    });

    it("should throw an error if department creation fails", async () => {
      const departmentName = "Engineering";

      when(departmentRepository.create)
        .calledWith(expect.any(Department))
        .mockRejectedValue(new Error("Database error"));

      await expect(
        departmentService.createDepartment(departmentName)
      ).rejects.toThrow("Database error");
    });
  });

  describe("getAllDepartments", () => {
    it("should return all departments", async () => {
      const mockDepartments = [
        { id: 1, name: "Engineering" },
        { id: 2, name: "Marketing" },
      ] as Department[];

      when(departmentRepository.findAll)
        .calledWith()
        .mockResolvedValue(mockDepartments);

      const result = await departmentService.getAllDepartments();

      expect(departmentRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(mockDepartments);
    });

    it("should return an empty array if no departments exist", async () => {
      when(departmentRepository.findAll).calledWith().mockResolvedValue([]);

      const result = await departmentService.getAllDepartments();

      expect(departmentRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual([]);
    });
  });

  describe("getDepartmentById", () => {
    it("should return a department when a valid ID is provided", async () => {
      const departmentId = 1;
      const mockDepartment = { id: 1, name: "Engineering" } as Department;

      when(departmentRepository.findById)
        .calledWith(departmentId)
        .mockResolvedValue(mockDepartment);

      const result = await departmentService.getDepartmentById(departmentId);

      expect(departmentRepository.findById).toHaveBeenCalledWith(departmentId);
      expect(result).toStrictEqual(mockDepartment);
    });

    it("should return null if the department does not exist", async () => {
      const departmentId = 999;

      when(departmentRepository.findById)
        .calledWith(departmentId)
        .mockResolvedValue(null);

      const result = await departmentService.getDepartmentById(departmentId);

      expect(departmentRepository.findById).toHaveBeenCalledWith(departmentId);
      expect(result).toBeNull();
    });
  });

  describe("updateDepartment", () => {
    it("should update an existing department successfully", async () => {
      const departmentId = 1;
      const newName = "Updated Engineering";
      const existingDepartment = { id: 1, name: "Engineering" } as Department;

      when(departmentRepository.findById)
        .calledWith(departmentId)
        .mockResolvedValue(existingDepartment);

      when(departmentRepository.update)
        .calledWith(departmentId, expect.objectContaining({ name: newName }))
        .mockResolvedValue(undefined);

      await departmentService.updateDepartment(departmentId, newName);

      expect(departmentRepository.findById).toHaveBeenCalledWith(departmentId);
      expect(departmentRepository.update).toHaveBeenCalledWith(
        departmentId,
        expect.objectContaining({ id: 1, name: newName })
      );
    });

    it("should not update if the department does not exist", async () => {
      const departmentId = 999;
      const newName = "Updated Engineering";

      when(departmentRepository.findById)
        .calledWith(departmentId)
        .mockResolvedValue(null);

      await departmentService.updateDepartment(departmentId, newName);

      expect(departmentRepository.findById).toHaveBeenCalledWith(departmentId);
      expect(departmentRepository.update).not.toHaveBeenCalled();
    });
  });

  describe("deleteDepartment", () => {
    it("should delete a department successfully", async () => {
      const departmentId = 1;

      when(departmentRepository.delete)
        .calledWith(departmentId)
        .mockResolvedValue(undefined);

      await departmentService.deleteDepartment(departmentId);

      expect(departmentRepository.delete).toHaveBeenCalledWith(departmentId);
    });

    it("should handle deletion of a non-existent department gracefully", async () => {
      const departmentId = 999;

      when(departmentRepository.delete)
        .calledWith(departmentId)
        .mockResolvedValue(undefined);

      await departmentService.deleteDepartment(departmentId);

      expect(departmentRepository.delete).toHaveBeenCalledWith(departmentId);
    });
  });
});